Ext.define('TCSRV.view.modelovehiculo.addons.ModeloVehiculoComboBox',{
   extend:'Ext.form.field.ComboBox',
   fieldLabel: "Modelo de Vehículo",
   allowBlank: false,
   name:'modelovehiculo',
   xtype:'modelovehiculo_combobox',
   store:'modelovehiculo.ModeloVehiculoStore',
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