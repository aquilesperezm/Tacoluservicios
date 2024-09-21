Ext.define("TCSRV.view.modelovehiculo.forms.ModeloVehiculoForm", {
  extend: "Ext.form.Panel",
  xtype: "modelovehiculo-form",
  //title: "Adicionar Centro Autorizado",

  defaults: {
    padding: 20,
  },

  method: "POST",

  url: "api/3/modelovehiculo_manager",

  items: [
    {
      xtype: "marcavehiculo_combobox",
      fieldLabel: "Marca",
      listeners:{
        render: (cmp)=>{
          cmp.focus();

        }
      }
    },
    {
      xtype: "textfield",
      fieldLabel: "Nombre",
      allowBlank: false,
      name: "nombre"/*,
      listeners: {
        render: (cmp) => {
          cmp.focus();
        },
      },*/
    },
  ],
});
