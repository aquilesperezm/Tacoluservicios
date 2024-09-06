Ext.define("TCSRV.view.centroautorizado.CentroAutorizadoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "centroautorizado-grid",
  title: "Centros Autorizados",
  store: 'centroautorizado.CentroAutorizadoStore',
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Código",
      dataIndex: "codigo",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
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
