Ext.define("TCSRV.model.vehiculo.VehiculoModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "codigo", type: "string" },
    { name: "nombre", type: "string" },
  ],

  idProperty: "id",
});
