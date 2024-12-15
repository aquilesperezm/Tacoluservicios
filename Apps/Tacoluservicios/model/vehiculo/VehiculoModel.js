Ext.define("TCSRV.model.vehiculo.VehiculoModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: "id", type: "int" },
    { name: "matricula", type: "string" },
    { name: "no_chasis", type: "string" },
    { name: "fecha_matricula", type: "date" , dateFormat:'d-m-Y'},
    //{ name: "fecha_matricula", type: "date"},

    { name: "codcliente", type: "string" },
    { name: "nombre_cliente", type: "string" },
    { name: "cifnif_cliente", type: "string" },

    { name: "idmodelo", type: "int" },
    { name: "nombre_modelo", type: "string" },

    { name: "nombre_marca", type: "string" },

  ],

  idProperty: "id",
});
