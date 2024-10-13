Ext.define("TCSRV.view.tacografo.forms.TacografoForm", {
  extend: "Ext.form.Panel",
  xtype: "tacografo-form",
  //title: "Adicionar Centro Autorizado",

  defaults: {
    padding: 20,
  },

  method: "POST",

  url: "api/3/tacografo_manager",

  items: [
    /*{
      xtype: "textfield",
      fieldLabel: "Código",
      allowBlank: false,
      name: "codigo",
      listeners:{
        render: (cmp)=>{
          cmp.focus();

        }
      }
    },*/
    {
      xtype: "textfield",
      fieldLabel: "Nombre",
      allowBlank: false,
      name: "nombre",
      listeners: {
        render: (cmp) => {
          cmp.focus();
        },
      },
    },
  ],
});
