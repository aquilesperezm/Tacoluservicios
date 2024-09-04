Ext.define("TCSRV.view.base.BaseGridView", {
  extend: "Ext.grid.Panel",
  xtype: "grid-base",
  padding: 20,
  border: 1,
  title: "Base Grid",
  height: 500,
  columnLines: true,
  
  plugins: {
    rowediting: {
      clicksToMoveEditor: 1,
      autoCancel: false,
    },
  },
  selModel: {
    type: "checkboxmodel",
    checkOnly: false,
  },
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
  ],
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
  tbar: [
    {
      text: "Adicionar",
    },
    "-",
    {
      text: "Eliminar",
    },
    "-",
    {
      text: "Detalles",
    },
    "-",
    {
      text: "Imprimir",
    },
    "-",
    {
      xtype: "textfield",
      fieldLabel: "Buscar",
      labelWidth: 50,
      width: 400,
    },
  ],

  bbar: {
    xtype: "pagingtoolbar",
    displayInfo: true,
    plugins: {
      "ux-progressbarpager": true,
    },
    items: [
      "-",
      {
        xtype: "numberfield",
        fieldLabel: "Items / Página",
        labelWidth: 90,
        width: 165,
        value: 50,
      },
    ],
  },
});
