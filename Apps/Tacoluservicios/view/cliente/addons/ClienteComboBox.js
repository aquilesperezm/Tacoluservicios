Ext.define('TCSRV.view.cliente.addons.ClienteComboBox',{
   extend:'Ext.form.field.ComboBox',
   fieldLabel: "Cliente",
   allowBlank: false,
   name:'cliente',
   xtype:'cliente_combobox',
   store:'cliente.ClienteStore',
   displayField:'nombre',
   valueField:'id',
   pageSize:20,
   listConfig:{
      //maxWidth:400,
      minWidth:350,
   },
   queryParam:'query',
   allQuery:'all',
   emptyText:'Nombre o CIFNIF',
   tpl: Ext.create('Ext.XTemplate',
      '<ul class="x-list-plain"><tpl for=".">',
          '<li role="option" class="x-boundlist-item">{nombre} - {cifnif}</li>',
      '</tpl></ul>'
  ),
  // template for the content inside text field
  displayTpl: Ext.create('Ext.XTemplate',
      '<tpl for=".">',
          '{nombre} - {cifnif}',
      '</tpl>'
  )

});