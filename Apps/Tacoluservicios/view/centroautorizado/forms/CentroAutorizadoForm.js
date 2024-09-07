Ext.define("TCSRV.view.centroautorizado.forms.CentroAutorizadoForm", {
  extend: "Ext.form.Panel",
  xtype: "centroautorizado-form",
  //title: "Adicionar Centro Autorizado",

  defaults: {
    padding: 20,
  },

  method: "POST",
  
  url: "api/3/centroautorizado_manager",
  
  items: [
    {
      xtype: "textfield",
      fieldLabel: "Código",
      allowBlank: false,
      name: "codigo",
    },
    {
      xtype: "textfield",
      fieldLabel: "Nombre",
      allowBlank: false,
      name: "nombre",
    },
  ],
});
