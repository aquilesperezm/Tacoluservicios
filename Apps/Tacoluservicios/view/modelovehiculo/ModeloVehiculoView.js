Ext.define("TCSRV.view.modelovehiculo.ModeloVehiculoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "modelovehiculo-grid",
  title: "Modelos de Vehículos",
  store: 'modelovehiculo.ModeloVehiculoStore',
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Modelo",
      dataIndex: "nombre",
      flex: 5,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Marca",
      dataIndex: "nombre_marca",
      flex: 5,
      editor: {
        xtype: "combobox",
        allowBlank: false,
      },
    }
  ],
});
