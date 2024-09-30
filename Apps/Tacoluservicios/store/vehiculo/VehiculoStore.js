Ext.define("TCSRV.store.vehiculo.VehiculoStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.vehiculo.VehiculoModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/vehiculo_manager",
    reader: {
      type: "json",
      rootProperty: "vehiculos",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
