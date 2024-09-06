Ext.define("TCSRV.view.centroautorizado.forms.CentroAutorizadoForm", {
  extend: "Ext.form.Panel",
  xtype: "centroautorizado-form",
  //title: "Adicionar Centro Autorizado",
 
  defaults:{
    padding:20,
  },
  items:[{
    xtype:'textfield',
    fieldLabel:'Código'
  },{
    xtype:'textfield',
    fieldLabel:'Nombre'
  }]
});
