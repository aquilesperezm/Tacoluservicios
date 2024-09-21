Ext.define("TCSRV.view.marcavehiculo.MarcaVehiculoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "marcavehiculo-grid",
  title: "Marcas de Vehículos",
  store: 'marcavehiculo.MarcaVehiculoStore',
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Nombre",
      dataIndex: "nombre",
      flex: 5,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    }
  ],
});
