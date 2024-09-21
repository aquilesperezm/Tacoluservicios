Ext.define("TCSRV.model.modelovehiculo.ModeloVehiculoModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "nombre", type: "string" },
    { name: "idmarca", type: "int" },
    { name: "nombre_marca", type: "string" },
  ],

  idProperty: "id",
});
