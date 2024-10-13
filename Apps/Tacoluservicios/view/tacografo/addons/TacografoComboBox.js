Ext.define('TCSRV.view.tacografo.addons.TacografoComboBox',{
   extend:'Ext.form.field.ComboBox',
   fieldLabel: "Marca de Vehículo",
   allowBlank: false,
   name:'tacografo',
   xtype:'tacografo_combobox',
   store:'tacografo.TacografoStore',
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