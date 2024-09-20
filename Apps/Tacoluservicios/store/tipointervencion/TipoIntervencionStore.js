Ext.define("TCSRV.store.tipointervencion.TipoIntervencionStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.tipointervencion.TipoIntervencionModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/tipointervencion_manager",
    reader: {
      type: "json",
      rootProperty: "tiposintervenciones",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
