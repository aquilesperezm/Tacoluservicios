Ext.define("TCSRV.view.tipointervencion.TipoIntervencionView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "tipointervencion-grid",
  title: "Tipos de Intervenciones a Vehículos",
  store: 'tipointervencion.TipoIntervencionStore',
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
