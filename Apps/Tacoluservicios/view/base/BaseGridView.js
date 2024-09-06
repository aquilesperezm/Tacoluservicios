Ext.define("TCSRV.view.base.BaseGridView", {
  extend: "Ext.grid.Panel",
  xtype: "grid-base",
  padding: 20,
  border: 1,
  title: "Base Grid",
  height:
    Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ) - 150,
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
      enableKeyEvents: true,
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
        minValue: 15,
      },
    ],
  },
});
