Ext.define("TCSRV.model.marcavehiculo.MarcaVehiculoModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "nombre", type: "string" },
  ],

  idProperty: "id",
});
