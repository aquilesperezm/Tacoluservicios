Ext.define("TCSRV.view.cliente.ClienteView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "grid-cliente",
  title: "Clientes",
  store: Ext.create("Ext.data.Store", {
    fields: ["name", "email", "phone"],
    data: [
      {
        name: "Lisa",
        email: "lisa@simpsons.com",
        phone: "555-111-1224",
      },
      {
        name: "Bart",
        email: "bart@simpsons.com",
        phone: "555-222-1234",
      },
      {
        name: "Homer",
        email: "homer@simpsons.com",
        phone: "555-222-1244",
      },
      {
        name: "Marge",
        email: "marge@simpsons.com",
        phone: "555-222-1254",
      },
    ],
  }),
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Código",
      dataIndex: "name",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Nombre",
      dataIndex: "email",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Número Fiscal",
      dataIndex: "phone",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Email",
      dataIndex: "phone",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Teléfono",
      dataIndex: "phone",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Centro Autorizado",
      dataIndex: "phone",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Observaciones",
      dataIndex: "phone",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
  ]
});
