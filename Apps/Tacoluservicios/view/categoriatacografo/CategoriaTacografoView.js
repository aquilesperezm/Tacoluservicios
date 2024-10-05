Ext.define("TCSRV.view.categoriatacografo.CategoriaTacografoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "categoriatacografo-grid",
  title: "Categorías de Tacógrafos",
  store: 'categoriatacografo.CategoriaTacografoStore',
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
