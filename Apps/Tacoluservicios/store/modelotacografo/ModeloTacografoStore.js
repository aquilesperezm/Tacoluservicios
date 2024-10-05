Ext.define("TCSRV.store.modelotacografo.ModeloTacografoStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.modelotacografo.ModeloTacografoModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/modelotacografo_manager",
    reader: {
      type: "json",
      rootProperty: "modelostacografo",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
