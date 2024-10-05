Ext.define("TCSRV.view.categoriatacografo.forms.CategoriaTacografoForm", {
  extend: "Ext.form.Panel",
  xtype: "categoriatacografo-form",
  //title: "Adicionar Centro Autorizado",

  defaults: {
    padding: 20,
  },

  method: "POST",

  url: "api/3/categoriatacografo_manager",

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
