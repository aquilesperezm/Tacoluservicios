Ext.application({
  name: "MyApp",
  appFolder: "Plugins/Tacoluservicios/Apps/Tacoluservicios",
  // The name of the initial view to create. With the classic toolkit this class
  // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
  // modern toolkit, the main view will be added to the Viewport.
  //
  //mainView: 'Main.view.main.Main'

  controllers: [
  ],

  launch: () => {
    Ext.Msg.alert('Status', 'Changes saved successfully.');

  },
});
