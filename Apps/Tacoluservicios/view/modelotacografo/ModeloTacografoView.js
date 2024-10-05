Ext.define("TCSRV.view.modelotacografo.ModeloTacografoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "modelotacografo-grid",
  title: "Modelos de Tacógrafos",
  store: 'modelotacografo.ModeloTacografoStore',
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
      text: "Tipo",
      dataIndex: "tipo",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    }
  ],
});
