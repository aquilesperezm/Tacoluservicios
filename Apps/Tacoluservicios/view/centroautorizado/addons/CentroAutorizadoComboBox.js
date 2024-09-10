Ext.define('TCSRV.view.centroautorizado.addons.CentroAutorizadoComboBox',{
   extend:'Ext.form.field.ComboBox',
   fieldLabel: "Centro Autorizado",
   allowBlank: false,
   name:'centroautorizado',
   xtype:'centroautorizado_combobox',
   store:'centroautorizado.CentroAutorizadoStore',
   displayField:'nombre',
   valueField:'id',
   pageSize:20,
   listConfig:{
      //maxWidth:400,
      minWidth:350,
   },
   queryParam:'query',
   allQuery:'all',
   emptyText:'Código o Nombre'

});