Ext.define("TCSRV.view.marcavehiculo.addons.MarcaVehiculoMsg", {
  extend: "Ext.window.MessageBox",
  xtype: "marcavehiculo-msg",
  title: "Eliminar Datos",
  message: "¿Usted esta eliminando datos, está seguro?",
  buttons: this.YESNOCANCEL,
  icon: this.QUESTION,
  fn: function (btn) {
    if (btn === "yes") {
      console.log("Yes pressed");
    } else if (btn === "no") {
      console.log("No pressed");
    } else {
      console.log("Cancel pressed");
    }
  },
});
