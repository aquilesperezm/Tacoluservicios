Ext.define("TCSRV.view.vehiculo.addons.VehiculoMsg", {
  extend: "Ext.window.MessageBox",
  xtype: "vehiculo-msg",
  title: "Eliminar Datos",
  message: "¿Usted esta eliminando datos, está seguro ?",
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
