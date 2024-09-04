Ext.application({
  name: "TCSRV",
  appFolder: "Plugins/Tacoluservicios/Apps/Tacoluservicios",
 
  controllers: ['dashboard.DashBoardController'
     ,'base.BaseController'
    ,'cliente.ClienteController'
  ],

  launch: () => {
     Ext.create('TCSRV.view.dashboard.DashBoardView');

  },
});
