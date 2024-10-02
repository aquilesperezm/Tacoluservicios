Ext.define("TCSRV.view.vehiculo.VehiculoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "vehiculo-grid",
  title: "Vehículos",
  store: "vehiculo.VehiculoStore",
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Matrícula",
      dataIndex: "matricula",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Número de Chasis",
      dataIndex: "no_chasis",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Fecha de Matrícula",
      dataIndex: "fecha_matricula",
      flex: 1,
      editor: {
        xtype: "datefield",
        //allowBlank: false,
      },
    },
    {
      text: "Cliente",
      dataIndex: "nombre_cliente",
      flex: 1,
      editor: {
        xtype: "combobox",
        //allowBlank: false,
      },
    },
    {
      text: "CIFNIF / Cliente",
      dataIndex: "cifnif_cliente",
      flex: 1/*,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },*/
    },
    {
      text: "Marca",
      dataIndex: "nombre_marca",
      flex: 1,
      editor: {
        xtype: "combobox",
        allowBlank: false,
      },
    },
    {
      text: "Modelo",
      dataIndex: "nombre_modelo",
      flex: 1,
      editor: {
        xtype: "combobox",
        allowBlank: false,
      },
    },
    {
      text: "Comentarios",
      dataIndex: "comentario",
      flex: 3,
      editor: {
        xtype: "textfield",
      },
    }
  ],
});
