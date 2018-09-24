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
            $('#delete-customer-modal').modal('toggle');


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
    var postnewcustomerdata = JSON.stringify({
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
    xhr.send(postnewcustomerdata);
  });

  //End Edit form


  //Fin Botones


  //FIN Tabla
  //Evento Seleccion tabla 1
  customerstbl.on('select', function(e, dt, type, indexes) {
      var rowData1 = customerstbl.rows(indexes).data().toArray();
      var account = rowData1["0"].accountnum;
      console.log("Selected Account: " + account);
      var transactionstbl = $('#transactions-table').DataTable({
        "destroy": "true",
        "select": "single",
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
        "select": "true"
      });
      transactionstbl.destroy();



    })
    .on('deselect', function(e, dt, type, indexes) {


    });

  //Fin evento
});
