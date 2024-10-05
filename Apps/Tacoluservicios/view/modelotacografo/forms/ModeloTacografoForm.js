Ext.define("TCSRV.view.modelotacografo.forms.ModeloTacografoForm", {
  extend: "Ext.form.Panel",
  xtype: "modelotacografo-form",
  //title: "Adicionar Centro Autorizado",

  defaults: {
    padding: 20,
  },

  method: "POST",

  url: "api/3/modelotacografo_manager",

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
