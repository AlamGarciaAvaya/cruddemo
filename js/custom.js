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
    "select": "single"
  });
  //Botones Costumers
  //Boton Add
  $("#addcustomer-frm").submit(function(event) {
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
        $('#addcustomer-modal').modal('toggle');
        $('#success-modal').modal('toggle');
        customerstbl.ajax.reload();
      }
    });
    xhr.open("POST", "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet");
    xhr.send(postnewcustomerdata);
  });

  //Fin Add


  //Fin Botones


  //FIN Tabla
  //Evento Seleccion tabla 1
  customerstbl.on('select', function(e, dt, type, indexes) {
      var rowData1 = customerstbl.rows(indexes).data().toArray();
      console.log(rowData1);
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
