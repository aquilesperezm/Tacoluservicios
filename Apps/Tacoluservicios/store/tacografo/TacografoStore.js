Ext.define("TCSRV.store.tacografo.TacografoStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.tacografo.TacografoModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/tacografo_manager",
    reader: {
      type: "json",
      rootProperty: "tacografos",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
