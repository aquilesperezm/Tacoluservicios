Ext.define("TCSRV.view.tacografo.TacografoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "tacografo-grid",
  title: "Tacógrafos",
  store: 'tacografo.TacografoStore',
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Número de Serie",
      dataIndex: "nombre",
      flex: 5,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
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
      dataIndex: "nombre",
      flex: 5,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    }
  ],
});
