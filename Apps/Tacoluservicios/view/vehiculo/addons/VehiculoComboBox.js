Ext.define('TCSRV.view.vehiculo.addons.VehiculoComboBox',{
   extend:'Ext.form.field.ComboBox',
   fieldLabel: "Vehículo",
   allowBlank: false,
   name:'vehiculo',
   xtype:'vehiculo_combobox',
   store:'vehiculo.VehiculoStore',
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