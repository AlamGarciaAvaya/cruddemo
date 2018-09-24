$(document).ready(function() {
  //Tabla 1
  var customerstbl = $('#customers-table').DataTable({
    "destroy": "true",
    "ajax": {
      "url": "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet",
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
          var editaccount = customerstbl.rows({
            selected: true
          }).data().toArray();
          console.log(editaccount["0"].accountnum);
          var getaccount = {
            "async": true,
            "crossDomain": true,
            "url": "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet?id=" + editaccount["0"].accountnum,
            "method": "GET"
          }

          $.ajax(getaccount).done(function(response) {
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
          var deleteaccount = customerstbl.rows({
            selected: true
          }).data().toArray();
          console.log(deleteaccount["0"].accountnum);
          var getaccount = {
            "async": true,
            "crossDomain": true,
            "url": "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet?id=" + deleteaccount["0"].accountnum,
            "method": "GET"
          }

          $.ajax(getaccount).done(function(response) {
            var dataaccount = JSON.parse(response);
            $('#delete-customer-modal').modal('toggle');
            $('#accountnum-delete ').val(dataaccount["0"].accountnum);

          });



        }
      }
    ]
  });
  //CRUD
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
    xhr.open("POST", "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet");
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
    xhr.open("PUT", "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet");
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
    xhr.open("DELETE", "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet");
    xhr.send(deletecustomerdata);
  });

  //End Edit form

  //Transactions Add
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
    xhr.open("POST", "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction");
    xhr.send(addtransactiondata);
  });

  //fin Add





  //Fin Botones





  //FIN Tabla
  //Evento Seleccion tabla 1
  customerstbl.on('select', function(e, dt, type, indexes) {
      var rowData1 = customerstbl.rows(indexes).data().toArray();
      var account = rowData1["0"].accountnum;
      console.log("Selected Account: " + account);
      var transactionstbl = $('#transactions-table').DataTable({
        "destroy": "true",
        "ajax": {
          "url": "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction?accountnum=" + account,
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
              var edittrans = transactionstbl.rows({
                selected: true
              }).data().toArray();
              console.log(edittrans["0"].transid);
              var getaccount = {
                "async": true,
                "crossDomain": true,
                "url": "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction?id=" + edittrans["0"].transid,
                "method": "GET"
              }

              $.ajax(getaccount).done(function(response) {
                console.log(response);
                $('#edit-transaction-modal').modal('toggle');
                $('#transaction-edit').val(response["0"].transid);
                $('#ammount-edit').val(response["0"].amount);
                $('#accountnumber-edit').val(response["0"].accountnum);
                $('#transdate-edit').val(response["0"].transdate);
                $('#merchantname-edit').val(response["0"].merchantname);

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
                "url": "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction?id=" + deletetrans["0"].transid,
                "method": "GET"
              }

              $.ajax(getaccount).done(function(response) {

                $('#delete-transaction-modal').modal('toggle');
                $('#transaction-delete').val(response["0"].transid);
                $('#ammount-delete').val(response["0"].amount);
                $('#accountnumber-delete').val(response["0"].accountnum);
                $('#transdate-delete').val(response["0"].transdate);
                $('#merchantname-delete').val(response["0"].merchantname);
              });



            }
          }
        ]
      });
    })

    .on('deselect', function(e, dt, type, indexes) {
      transactionstbl.clear()
      transactionstbl.draw();


    });


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
      xhr.open("PUT", "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction");
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
      xhr.open("DELETE", "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction");
      xhr.send(deletetransactiondata);
    });

    //fin Edit
  //Fin evento
});
