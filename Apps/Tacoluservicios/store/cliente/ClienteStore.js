Ext.define("TCSRV.store.cliente.ClienteStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.cliente.ClienteModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/cliente_manager",
    reader: {
      type: "json",
      rootProperty: "clientes",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
