Ext.application({
  name: "TCSRV",
  appFolder: "Plugins/Tacoluservicios/Apps/Tacoluservicios",
 
  controllers: ['dashboard.DashBoardController'],

  launch: () => {
     Ext.create('TCSRV.view.dashboard.DashBoardView');

  },
});
