Ext.define("TCSRV.model.modelovehiculo.ModeloVehiculoModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "nombre", type: "string" },
  ],

  idProperty: "id",
});
