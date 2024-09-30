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
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Cliente",
      dataIndex: "codcliente",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Marca",
      dataIndex: "idmodelo",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Modelo",
      dataIndex: "idmodelo",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Comentarios",
      dataIndex: "comentario",
      flex: 3,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    }
  ],
});
