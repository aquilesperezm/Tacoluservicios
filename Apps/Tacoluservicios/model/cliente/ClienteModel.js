Ext.define("TCSRV.model.cliente.ClienteModel", {
  extend: "Ext.data.Model",
  fields: [
    //id
    { name: "codcliente", type: "string" },

    { name: "nombre", type: "string" },
    { name: "email", type: "string" },
    { name: "cifnif", type: "string" },
    { name: "observaciones", type: "string" },
    { name: "telefono1", type: "string" },
    { name: "id_centroautorizado", type: "int" },
    { name: "nombre_centroautorizado", type: "string" },
    
  ],

  idProperty:'codcliente'
});
