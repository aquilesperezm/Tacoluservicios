Ext.application({
  name: "TCSRV",
  appFolder: "Plugins/Tacoluservicios/Apps/Tacoluservicios",

  controllers: [
    "dashboard.DashBoardController",
    "base.BaseController",
    "centroautorizado.CentroAutorizadoController",
    "cliente.ClienteController",
    "tipointervencion.TipoIntervencionController",
    "marcavehiculo.MarcaVehiculoController",
    "modelovehiculo.ModeloVehiculoController",
    "vehiculo.VehiculoController"

  ],

  launch: () => {
    Ext.create("TCSRV.view.dashboard.DashBoardView");
  },
});
