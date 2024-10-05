Ext.define("TCSRV.store.categoriatacografo.CategoriaTacografoStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.categoriatacografo.CategoriaTacografoModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/categoriatacografo_manager",
    reader: {
      type: "json",
      rootProperty: "categoriastacografos",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
