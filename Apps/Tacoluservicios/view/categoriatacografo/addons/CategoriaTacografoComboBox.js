Ext.define('TCSRV.view.categoriatacografo.addons.CategoriaTacografoComboBox',{
   extend:'Ext.form.field.ComboBox',
   fieldLabel: "Marca de Vehículo",
   allowBlank: false,
   name:'categoriatacografo',
   xtype:'categoriatacografo_combobox',
   store:'categoriatacografo.CategoriaTacografoStore',
   displayField:'nombre',
   valueField:'id',
   pageSize:20,
   listConfig:{
      //maxWidth:400,
      minWidth:350,
   },
   queryParam:'query',
   allQuery:'all',
   emptyText:'Nombre'

});