$(document).ready(function() {
  var e = $("#customers-table").DataTable({
    destroy: "true",
    ajax: {
      url: "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet",
      dataSrc: ""
    },
    columns: [{
      data: "accountnum"
    }, {
      data: "email"
    }, {
      data: "firstname"
    }, {
      data: "lastname"
    }, {
      data: "phone"
    }, {
      data: "preference"
    }],
    select: "single",
    dom: "Bfrtip",
    buttons: [{
      extend: "selected",
      text: "Edit",
      action: function(t, a, n, o, s) {
        var r = e.rows({
          selected: !0
        }).data().toArray();
        console.log(r[0].accountnum);
        var c = {
          async: !0,
          crossDomain: !0,
          url: "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet?id=" + r[0].accountnum,
          method: "GET"
        };
        $.ajax(c).done(function(e) {
          var t = JSON.parse(e);
          $("#edit-customer-modal").modal("toggle"), $("#accountnum-edit").val(t[0].accountnum), $("#email-edit").val(t[0].email), $("#firstname-edit").val(t[0].firstname), $("#lastname-edit").val(t[0].lastname), $("#phone-edit").val(t[0].phone), $("#preference-edit").val(t[0].preference)
        })
      }
    }, {
      extend: "selected",
      text: "Delete",
      action: function(t, a, n, o, s) {
        var r = e.rows({
          selected: !0
        }).data().toArray();
        console.log(r[0].accountnum);
        var c = {
          async: !0,
          crossDomain: !0,
          url: "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet?id=" + r[0].accountnum,
          method: "GET"
        };
        $.ajax(c).done(function(e) {
          var t = JSON.parse(e);
          $("#delete-customer-modal").modal("toggle"), $("#accountnum-delete ").val(t[0].accountnum)
        })
      }
    }]
  });
  $("#add-customer-frm").submit(function(t) {
    var a = JSON.stringify({
      accountnum: "" + $("input#accountnum").val(),
      email: "" + $("input#email").val(),
      firstname: "" + $("input#firstname").val(),
      lastname: "" + $("input#lastname").val(),
      phone: "" + $("input#phone").val(),
      preference: "" + $("input#preference").val()
    });
    t.preventDefault();
    var n = new XMLHttpRequest;
    n.addEventListener("readystatechange", function() {
      4 === this.readyState && (console.log(this.responseText), $("#add-customer-modal").modal("toggle"), $("#success-modal").modal("toggle"), e.ajax.reload())
    }), n.open("POST", "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet"), n.send(a)
  }), $("#edit-customer-frm").submit(function(t) {
    var a = JSON.stringify({
      accountnum: "" + $("input#accountnum-edit").val(),
      email: "" + $("input#email-edit").val(),
      firstname: "" + $("input#firstname-edit").val(),
      lastname: "" + $("input#lastname-edit").val(),
      phone: "" + $("input#phone-edit").val(),
      preference: "" + $("input#preference-edit").val()
    });
    t.preventDefault();
    var n = new XMLHttpRequest;
    n.addEventListener("readystatechange", function() {
      4 === this.readyState && (console.log(this.responseText), $("#edit-customer-modal").modal("toggle"), $("#success-modal").modal("toggle"), e.ajax.reload())
    }), n.open("PUT", "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet"), n.send(a)
  }), $("#delete-customer-frm").submit(function(t) {
    var a = JSON.stringify({
      accountnum: "" + $("input#accountnum-delete").val()
    });
    t.preventDefault();
    var n = new XMLHttpRequest;
    n.addEventListener("readystatechange", function() {
      4 === this.readyState && (console.log(this.responseText), $("#delete-customer-modal").modal("toggle"), $("#success-modal").modal("toggle"), e.ajax.reload())
    }), n.open("DELETE", "https://135.169.18.7/services/AAADEVURIELPrueba5/MyServlet"), n.send(a)
  }), e.on("select", function(t, a, n, o) {
    var s = e.rows(o).data().toArray()[0].accountnum;
    console.log("Selected Account: " + s);
    var r = $("#transactions-table").DataTable({
      destroy: "true",
      ajax: {
        url: "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction?accountnum=" + s,
        dataSrc: ""
      },
      columns: [{
        data: "transid"
      }, {
        data: "amount"
      }, {
        data: "accountnum"
      }, {
        data: "transdate"
      }, {
        data: "merchantname"
      }],
      select: "single",
      dom: "Bfrtip",
      buttons: [{
        extend: "selected",
        text: "Edit",
        action: function(e, t, a, n, o) {
          var s = r.rows({
            selected: !0
          }).data().toArray();
          console.log(s[0].transid);
          var c = {
            async: !0,
            crossDomain: !0,
            url: "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction?id=" + s[0].transid,
            method: "GET"
          };
          $.ajax(c).done(function(e) {
            console.log(e), $("#edit-transaction-modal").modal("toggle"), $("#transaction-edit").val(e[0].transid), $("#ammount-edit").val(e[0].amount), $("#accountnumber-edit").val(e[0].accountnum), $("#transdate-edit").val(e[0].transdate), $("#merchantname-edit").val(e[0].merchantname)
          })
        }
      }, {
        extend: "selected",
        text: "Delete",
        action: function(e, t, a, n, o) {
          var s = r.rows({
            selected: !0
          }).data().toArray();
          console.log(s[0].accountnum);
          var c = {
            async: !0,
            crossDomain: !0,
            url: "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction?id=" + s[0].transid,
            method: "GET"
          };
          $.ajax(c).done(function(e) {
            $("#delete-transaction-modal").modal("toggle"), $("#transaction-delete").val(e[0].transid), $("#ammount-delete").val(e[0].amount), $("#accountnumber-delete").val(e[0].accountnum), $("#transdate-delete").val(e[0].transdate), $("#merchantname-delete").val(e[0].merchantname)
          })
        }
      }]
    });
    $("#add-transaction-frm").submit(function(e) {
      var t = JSON.stringify({
        transid: "" + $("input#transaction").val(),
        amount: "" + $("input#ammount").val(),
        accountnum: "" + $("input#accountnumber").val(),
        transdate: "" + $("input#transdate").val(),
        merchantname: "" + $("input#merchantname").val()
      });
      e.preventDefault();
      var a = new XMLHttpRequest;
      a.addEventListener("readystatechange", function() {
        4 === this.readyState && (console.log(this.responseText), $("#add-transaction-modal").modal("toggle"), $("#success-modal").modal("toggle"), r.ajax.reload())
      }), a.open("POST", "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction"), a.send(t)
    }), $("#edit-transaction-frm").submit(function(e) {
      var t = JSON.stringify({
        transid: "" + $("input#transaction-edit").val(),
        amount: "" + $("input#ammount-edit").val(),
        accountnum: "" + $("input#accountnumber-edit").val(),
        transdate: "" + $("input#transdate-edit").val(),
        merchantname: "" + $("input#merchantname-edit").val()
      });
      e.preventDefault();
      var a = new XMLHttpRequest;
      a.addEventListener("readystatechange", function() {
        4 === this.readyState && (console.log(this.responseText), $("#edit-transaction-modal").modal("toggle"), $("#success-modal").modal("toggle"), r.ajax.reload())
      }), a.open("PUT", "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction"), a.send(t)
    }), $("#delete-transaction-frm").submit(function(e) {
      var t = JSON.stringify({
        transid: "" + $("input#transaction-delete").val()
      });
      e.preventDefault();
      var a = new XMLHttpRequest;
      a.addEventListener("readystatechange", function() {
        4 === this.readyState && (console.log(this.responseText), $("#delete-transaction-modal").modal("toggle"), $("#success-modal").modal("toggle"), r.ajax.reload())
      }), a.open("DELETE", "https://135.169.18.7/services/AAADEVURIELPrueba5/transaction"), a.send(t)
    }), e.on("deselect", function(e, t, a, n) {
      r.clear(), r.draw()
    })
  })
});
