Ext.define('TCSRV.view.marcavehiculo.addons.MarcaVehiculoComboBox',{
   extend:'Ext.form.field.ComboBox',
   fieldLabel: "Marca de Vehículo",
   allowBlank: false,
   name:'marcavehiculo',
   xtype:'marcavehiculo_combobox',
   store:'marcavehiculo.MarcaVehiculoStore',
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