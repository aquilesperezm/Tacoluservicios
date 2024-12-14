Ext.define("TCSRV.controller.dashboard.DashBoardController", {
  extend: "Ext.app.Controller",

  views: ["dashboard.DashBoardView"],
  stores: [],

  control: {
    "#menu_principal_centroautorizado": {
      click: "onSelectMainMenu_CentroAutorizado",
    },
    "#menu_principal_clientes": {
      click: "onSelectMainMenu_Clientes",
    },
  },

  init: () => {},

  onSelectMainMenu_CentroAutorizado: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];

    Ext.data.StoreManager.lookup("centroautorizado.CentroAutorizadoStore").load(
      {
        scope: this,
        callback: (records, operation, success) => {
          d.destroy();
          panel_central.add({
            xtype: "centroautorizado-grid",
          });
          btn.disable();
          Ext.getCmp("menu_principal_clientes").enable();
        },
      }
    );
  },

  onSelectMainMenu_Clientes: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];
    Ext.data.StoreManager.lookup("cliente.ClienteStore").load({
      scope: this,
      callback: (records, operation, success) => {
        d.destroy();
        panel_central.add({
          xtype: "cliente-grid",
        });
        btn.disable();
        Ext.getCmp("menu_principal_centroautorizado").enable();
      },
    });
  },
});
