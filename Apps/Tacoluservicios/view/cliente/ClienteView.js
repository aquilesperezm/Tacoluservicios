Ext.define("TCSRV.view.cliente.ClienteView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "cliente-grid",
  title: "Clientes",
  store: "cliente.ClienteStore",
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Nombre",
      dataIndex: "nombre",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Correo Electrónico",
      dataIndex: "email",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Número Fiscal",
      dataIndex: "cifnif",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Teléfono",
      dataIndex: "telefono1",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Centro Autorizado",
      dataIndex: "nombre_centroautorizado",
      flex: 1,
      editor: {
        xtype: "combobox",
        allowBlank: false,
      },
    },
    {
      text: "Observaciones",
      dataIndex: "observaciones",
      flex: 1,
      editor: {
        xtype: "textfield",
      },
    },
  ]
});
