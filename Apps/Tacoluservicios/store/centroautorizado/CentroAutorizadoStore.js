Ext.define("TCSRV.store.centroautorizado.CentroAutorizadoStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.centroautorizado.CentroAutorizadoModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/centroautorizado_manager",
    reader: {
      type: "json",
      rootProperty: "centrosautorizados",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
