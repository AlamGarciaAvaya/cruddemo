$(document).ready(function() {
  //Tabla 1
  var transactionstbl = $('#transactions-table').DataTable({
    "destroy": "true",
    "ajax": {
      "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction",
      "dataSrc": ""
    },
    "columns": [{
        "data": "transid"
      },
      {
        "data": "amount"
      },
      {
        "data": "accountnum"
      },
      {
        "data": "transdate"
      },
      {
        "data": "merchantname"
      }
    ],
    "select": "single",
    "dom": 'Bfrtip',
    "buttons": [{
        "extend": 'selected',
        "text": 'Edit',
        action: function(e, dt, button, config, indexes) {
          var edittransaction = transactionstbl.rows({selected: true}).data().toArray();
          console.log(edittransaction["0"].transid);
          var gettransaction = {
            "async": true,
            "crossDomain": true,
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
            $('#merchantname-edit').val(dataaccount["0"].merchantname);
          });
        }
      },
      {
        "extend": 'selected',
        "text": 'Delete',
        action: function(e, dt, button, config, indexes) {
          var deletetransaction = transactionstbl.rows({
            selected: true
          }).data().toArray();
          console.log(deletetransaction["0"].transid);
          var getaccount = {
            "async": true,
            "crossDomain": true,
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
            $('#merchantname-delete').val(dataaccount["0"].merchantname);
          });
        }
      },
      {
        "extend": 'selected',
        "text": 'Submit',
        action: function(e, dt, button, config, indexes) {
          var submittransaction = transactionstbl.rows({
            selected: true
          }).data().toArray();
          var transactionpost = submittransaction["0"].transid;
          console.log(transactionpost);
          var data = new FormData();
data.append("family", "AAAMIAMAN");
data.append("type", "AAAMIAMANCJ");
data.append("version", "1.0");
data.append("eventBody", "{\"transid\":\""+ transactionpost +"\"}");

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    alert('Submit completo');
  }
});

xhr.open("POST", "http://breeze2-213.collaboratory.avaya.com/services/EventingConnector/events");

xhr.send(data);
        }
      }
    ]
  });
  //CRUD


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
        transactionstbl.ajax.reload();

      }
    });
    xhr.open("POST", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction");
    xhr.send(addtransactiondata);
  });

  //fin Add
  //Transactions Edit
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
        transactionstbl.ajax.reload();
      }
    });
    xhr.open("PUT", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction");
    xhr.send(updatetransactiondata);
  });

  //fin Edit

  //Transactions Edit
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
        transactionstbl.ajax.reload();
      }
    });
    xhr.open("DELETE", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/transaction");
    xhr.send(deletetransactiondata);
  });


  //Evento Seleccion tabla 1
  transactionstbl.on('select', function(e, dt, type, indexes) {
    var rowData1 = transactionstbl.rows(indexes).data().toArray();
    var account = rowData1["0"].accountnum;
    console.log("Selected Account: " + account);
    var customerstbl = $('#customers-table').DataTable({
      "destroy": "true",
      "ajax": {
        "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer?accountnum=" + account,
        "dataSrc": ""
      },
      "columns": [{
          "data": "accountnum"
        },
        {
          "data": "email"
        },
        {
          "data": "firstname"
        },
        {
          "data": "lastname"
        },
        {
          "data": "phone"
        },
        {
          "data": "preference"
        }
      ],
      "select": "single",
      "dom": 'Bfrtip',
      "buttons": [{
          "extend": 'selected',
          "text": 'Edit',
          action: function(e, dt, button, config, indexes) {
            var editcustomer = customerstbl.rows({
              selected: true
            }).data().toArray();
            console.log(editcustomer);
            var getaccount = {
              "async": true,
              "crossDomain": true,
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
              $('#preference-edit').val(dataaccount["0"].preference);

            });

          }
        },
        {
          "extend": 'selected',
          "text": 'Delete',
          action: function(e, dt, button, config, indexes) {
            var deletetrans = transactionstbl.rows({
              selected: true
            }).data().toArray();
            console.log(deletetrans["0"].accountnum);
            var getaccount = {
              "async": true,
              "crossDomain": true,
              "url": "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer?accountnum=" + editcustomer["0"].accountnum,
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
              $('#preference-delete').val(dataaccount["0"].preference);

            });



          }
        }
      ]
    });

    //Transactions Add

    // Add
    $("#add-customer-frm").submit(function(event) {
      var postnewcustomerdata = JSON.stringify({
        "accountnum": "" + $('input#accountnum').val() + "",
        "email": "" + $('input#email').val() + "",
        "firstname": "" + $('input#firstname').val() + "",
        "lastname": "" + $('input#lastname').val() + "",
        "phone": "" + $('input#phone').val() + "",
        "preference": "" + $('input#preference').val() + ""
      });
      event.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          console.log(this.responseText);
          $('#add-customer-modal').modal('toggle');
          $('#success-modal').modal('toggle');
          customerstbl.ajax.reload();
        }
      });
      xhr.open("POST", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer");
      xhr.send(postnewcustomerdata);
    });

    //End Add

    //Edit - PUT

    $("#edit-customer-frm").submit(function(event) {
      var updatecustomerdata = JSON.stringify({
        "accountnum": "" + $('input#accountnum-edit').val() + "",
        "email": "" + $('input#email-edit').val() + "",
        "firstname": "" + $('input#firstname-edit').val() + "",
        "lastname": "" + $('input#lastname-edit').val() + "",
        "phone": "" + $('input#phone-edit').val() + "",
        "preference": "" + $('input#preference-edit').val() + ""
      });
      event.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          console.log(this.responseText);
          $('#edit-customer-modal').modal('toggle');
          $('#success-modal').modal('toggle');
          customerstbl.ajax.reload();
        }
      });
      xhr.open("PUT", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer");
      xhr.send(updatecustomerdata);
    });

    //End Edit form
    //Delete

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
          customerstbl.ajax.reload();
        }
      });
      xhr.open("DELETE", "http://breezex7-213.collaboratory.avaya.com/services/AAAMIADBWEBSERVICE/customer");
      xhr.send(deletecustomerdata);
    });

    //End Edit form

    transactionstbl.on('deselect', function(e, dt, type, indexes) {
      customerstbl.clear()
      customerstbl.draw();
    });
    //fin Edit
  })





  //Fin evento
});
