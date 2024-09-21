Ext.define("TCSRV.store.modelovehiculo.ModeloVehiculoStore", {
  extend: "Ext.data.Store",
  model: "TCSRV.model.modelovehiculo.ModeloVehiculoModel",
  proxy: {
    headers: { Token: "Tacoluservicios2024**" },
    type: "ajax",
    url: "api/3/modelovehiculo_manager",
    reader: {
      type: "json",
      rootProperty: "modelosvehiculos",
      totalProperty: "total",
    },
    extraParams: {
      action: "read",
    },
  },
  pageSize: 50,
  autoLoad: true,
});
