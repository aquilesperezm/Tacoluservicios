Ext.define('TCSRV.view.modelotacografo.addons.ModeloTacografoComboBox',{
   extend:'Ext.form.field.ComboBox',
   fieldLabel: "Marca de Vehículo",
   allowBlank: false,
   name:'modelotacografo',
   xtype:'modelotacografo_combobox',
   store:'modelotacografo.ModeloTacografoStore',
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