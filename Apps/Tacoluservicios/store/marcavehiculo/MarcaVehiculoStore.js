Ext.define("TCSRV.store.marcavehiculo.MarcaVehiculoStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.marcavehiculo.MarcaVehiculoModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/marcavehiculo_manager",
    reader: {
      type: "json",
      rootProperty: "marcasvehiculos",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
