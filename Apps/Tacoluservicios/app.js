Ext.application({
  name: "TCSRV",
  appFolder: "Plugins/Tacoluservicios/Apps/Tacoluservicios",
  // The name of the initial view to create. With the classic toolkit this class
  // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
  // modern toolkit, the main view will be added to the Viewport.
  //
  //mainView: 'Main.view.main.Main'

  controllers: [],

  launch: () => {
    Ext.create("Ext.container.Viewport", {
      layout: "border",
      items: [
        {
          region: "north",
          html: '<h1 class="x-panel-header">Page Title</h1>',
          border: false,
          margin: "0 0 5 0",
        },
        {
          region: "center",
          toolbar:'',
          title:'TACOLUSERVICIOS 1.00'
          //xtype: 'tpanel', // TabPanel itself has no title
          // activeTab: 0,      // First tab active by default
          /*items: {
              title: 'Default Tab',
              html: 'The first tab\'s content. Others may be added dynamically'
          }*/
        },
      ],
    });
  },
});
