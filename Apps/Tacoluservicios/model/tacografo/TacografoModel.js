Ext.define("TCSRV.model.tacografo.TacografoModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "nombre", type: "string" },
  ],

  idProperty: "id",
});
