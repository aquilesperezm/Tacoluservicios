Ext.define("TCSRV.view.vehiculo.forms.VehiculoForm", {
  extend: "Ext.form.Panel",
  xtype: "vehiculo-form",
  //title: "Adicionar Centro Autorizado",

  defaults: {
    padding: 20,
  },

  method: "POST",
  
  url: "api/3/vehiculo_manager",
  
  items: [
    {
      xtype: "textfield",
      fieldLabel: "Código",
      allowBlank: false,
      name: "codigo",
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
      name: "nombre",
    },
  ],
});
