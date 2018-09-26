$(document).ready(function() {

//Variables Breeze
  var bfamily = "AAAMIAMAN";
  var btype = "AAAMIAMANCJ";
  var bversion = "1.0";

    var transactionstbl = $('#transactions-table').DataTable({
        "destroy": "true",
        "ajax": {
            "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction",
            "dataSrc": ""
        },
        "columns": [{
            "data": "transid"
        }, {
            "data": "amount"
        }, {
            "data": "accountnum"
        }, {
            "data": "transdate"
        }, {
            "data": "merchantname"
        }],
        "select": "single",
        "dom": 'Bfrtip',
        "buttons": [{
            "extend": 'selected',
            "text": 'Edit',
            action: function(e, dt, button, config, indexes) {
                var edittransaction = transactionstbl.rows({
                    selected: !0
                }).data().toArray();
                console.log(edittransaction["0"].transid);
                var gettransaction = {
                    "async": !0,
                    "crossDomain": !0,
                    "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction?transid=" + edittransaction["0"].transid,
                    "method": "GET"
                }
                $.ajax(gettransaction).done(function(response) {
                    var dataaccount = JSON.parse(response);
                    console.log("Selected Transaction to Edit:");
                    console.log(dataaccount);
                    $('#edit-transaction-modal').modal('toggle');
                    $('#transaction-edit').val(dataaccount["0"].transid);
                    $('#ammount-edit').val(dataaccount["0"].amount);
                    $('#accountnumber-edit').val(dataaccount["0"].accountnum);
                    $('#transdate-edit').val(dataaccount["0"].transdate);
                    $('#merchantname-edit').val(dataaccount["0"].merchantname)
                })
            }
        }, {
            "extend": 'selected',
            "text": 'Delete',
            action: function(e, dt, button, config, indexes) {
                var deletetransaction = transactionstbl.rows({
                    selected: !0
                }).data().toArray();
                console.log(deletetransaction["0"].transid);
                var getaccount = {
                    "async": !0,
                    "crossDomain": !0,
                    "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction?transid=" + deletetransaction["0"].transid,
                    "method": "GET"
                }
                $.ajax(getaccount).done(function(response) {
                    var dataaccount = JSON.parse(response);
                    console.log(dataaccount);
                    $('#delete-transaction-modal').modal('toggle');
                    $('#transaction-delete').val(dataaccount["0"].transid);
                    $('#ammount-delete').val(dataaccount["0"].amount);
                    $('#accountnumber-delete').val(dataaccount["0"].accountnum);
                    $('#transdate-delete').val(dataaccount["0"].transdate);
                    $('#merchantname-delete').val(dataaccount["0"].merchantname)
                })
            }
        }, {
            "extend": 'selected',
            "text": 'Submit',
            action: function(e, dt, button, config, indexes) {
                var submittransaction = transactionstbl.rows({
                    selected: !0
                }).data().toArray();
                var transactionpost = submittransaction["0"].transid;
                console.log(transactionpost);
                var data = new FormData();
                data.append("family", bfamily);
                data.append("type", btype);
                data.append("version", bversion );
                data.append("eventBody", "{\"transid\":\"" + transactionpost + "\"}");
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {
                        alert('Submit')
                    }
                });
                //xhr.open("POST", "http://breeze2-213.collaboratory.avaya.com/services/EventingConnector/events");
                xhr.open("POST", "http://demo0512177.mockable.io/post");
                xhr.send(data)
            }
        }]
    });
    $("#add-transaction-frm").submit(function(event) {
        var addtransactiondata = JSON.stringify({
            "transid": "" + $('input#transaction').val() + "",
            "amount": "" + $('input#ammount').val() + "",
            "accountnum": "" + $('input#accountnumber').val() + "",
            "transdate": "" + $('input#transdate').val() + "",
            "merchantname": "" + $('input#merchantname').val() + ""
        });
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
                $('#add-transaction-modal').modal('toggle');
                $('#success-modal').modal('toggle');
                transactionstbl.ajax.reload()
            }
        });
        xhr.open("POST", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction");
        xhr.send(addtransactiondata)
    });
    $("#edit-transaction-frm").submit(function(event) {
        var updatetransactiondata = JSON.stringify({
            "transid": "" + $('input#transaction-edit').val() + "",
            "amount": "" + $('input#ammount-edit').val() + "",
            "accountnum": "" + $('input#accountnumber-edit').val() + "",
            "transdate": "" + $('input#transdate-edit').val() + "",
            "merchantname": "" + $('input#merchantname-edit').val() + ""
        });
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
                $('#edit-transaction-modal').modal('toggle');
                $('#success-modal').modal('toggle');
                transactionstbl.ajax.reload()
            }
        });
        xhr.open("PUT", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction");
        xhr.send(updatetransactiondata)
    });
    $("#delete-transaction-frm").submit(function(event) {
        var deletetransactiondata = JSON.stringify({
            "transid": "" + $('input#transaction-delete').val() + "",
        });
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
                $('#delete-transaction-modal').modal('toggle');
                $('#success-modal').modal('toggle');
                transactionstbl.ajax.reload()
            }
        });
        xhr.open("DELETE", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction");
        xhr.send(deletetransactiondata)
    });
    transactionstbl.on('select', function(e, dt, type, indexes) {
        var rowData1 = transactionstbl.rows(indexes).data().toArray();
        var account = rowData1["0"].accountnum;
        console.log("Selected Account: " + account);
        valuesearch =  rowData1["0"].accountnum ;
        customerstbl.column(0).search(valuesearch, true, false).draw();

        transactionstbl.on('deselect', function(e, dt, type, indexes) {
          customerstbl.column(0).search("", true, false).draw();
        })
    })
    var customerstbl = $('#customers-table').DataTable({
        "destroy": "true",
        "ajax": {
            "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer?accountnum",
            "dataSrc": ""
        },
        "columns": [{
            "data": "accountnum"
        }, {
            "data": "email"
        }, {
            "data": "firstname"
        }, {
            "data": "lastname"
        }, {
            "data": "phone"
        }, {
            "data": "preference"
        }],
        "select": "single",
        "dom": 'Bfrtip',
        "buttons": [{
            "extend": 'selected',
            "text": 'Edit',
            action: function(e, dt, button, config, indexes) {
                var editcustomer = customerstbl.rows({
                    selected: !0
                }).data().toArray();
                console.log(editcustomer);
                var getaccount = {
                    "async": !0,
                    "crossDomain": !0,
                    "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer?accountnum=" + editcustomer["0"].accountnum,
                    "method": "GET"
                }
                $.ajax(getaccount).done(function(response) {
                    console.log(response);
                    var dataaccount = JSON.parse(response);
                    $('#edit-customer-modal').modal('toggle');
                    $('#accountnum-edit').val(dataaccount["0"].accountnum);
                    $('#email-edit').val(dataaccount["0"].email);
                    $('#firstname-edit').val(dataaccount["0"].firstname);
                    $('#lastname-edit').val(dataaccount["0"].lastname);
                    $('#phone-edit').val(dataaccount["0"].phone);
                    $('#preference-edit').val(dataaccount["0"].preference)
                })
            }
        }, {
            "extend": 'selected',
            "text": 'Delete',
            action: function(e, dt, button, config, indexes) {
                var deletetrans = customerstbl.rows({
                    selected: !0
                }).data().toArray();
                console.log(deletetrans["0"].accountnum);
                var getaccount = {
                    "async": !0,
                    "crossDomain": !0,
                    "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer?accountnum=" + deletetrans["0"].accountnum,
                    "method": "GET"
                }
                $.ajax(getaccount).done(function(response) {
                    console.log(response);
                    var dataaccount = JSON.parse(response);
                    $('#delete-customer-modal').modal('toggle');
                    $('#accountnum-delete').val(dataaccount["0"].accountnum);
                    $('#email-delete').val(dataaccount["0"].email);
                    $('#firstname-delete').val(dataaccount["0"].firstname);
                    $('#lastname-delete').val(dataaccount["0"].lastname);
                    $('#phone-delete').val(dataaccount["0"].phone);
                    $('#preference-delete').val(dataaccount["0"].preference)
                })
            }
        }]
    });
    $("#add-customer-frm").submit(function(event) {
        var postnewcustomerdata = JSON.stringify({
            "accountnum": "" + $('input#accountnum').val() + "",
            "email": "" + $('input#email').val() + "",
            "firstname": "" + $('input#firstname').val() + "",
            "lastname": "" + $('input#lastname').val() + "",
            "phone": "" + $('input#phone').val() + "",
            "preference": "" + $('select#preference').val() + ""
        });
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
                $('#add-customer-modal').modal('toggle');
                $('#success-modal').modal('toggle');
                customerstbl.ajax.reload()
            }
        });
        xhr.open("POST", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer");
        xhr.send(postnewcustomerdata)
    });
    $("#edit-customer-frm").submit(function(event) {
        var updatecustomerdata = JSON.stringify({
            "accountnum": "" + $('input#accountnum-edit').val() + "",
            "email": "" + $('input#email-edit').val() + "",
            "firstname": "" + $('input#firstname-edit').val() + "",
            "lastname": "" + $('input#lastname-edit').val() + "",
            "phone": "" + $('input#phone-edit').val() + "",
            "preference": "" + $('select#preference-edit').val() + ""
        });
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
                $('#edit-customer-modal').modal('toggle');
                $('#success-modal').modal('toggle');
                customerstbl.ajax.reload()
            }
        });
        xhr.open("PUT", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer");
        xhr.send(updatecustomerdata)
    });
    $("#delete-customer-frm").submit(function(event) {
        var deletecustomerdata = JSON.stringify({
            "accountnum": "" + $('input#accountnum-delete').val() + ""
        });
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
                $('#delete-customer-modal').modal('toggle');
                $('#success-modal').modal('toggle');
                customerstbl.ajax.reload()
            }
        });
        xhr.open("DELETE", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer");
        xhr.send(deletecustomerdata)
    })
})
