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
    "#menu_principal_tipointervenciones": {
      click: "onSelectMainMenu_TipoIntervenciones",
    },
    //vehiculos
    "#menu_principal_vehiculos_marcas": {
      click: "onSelectMainMenu_Vehiculos_Marcas",
    },
    "#menu_principal_vehiculos_modelos": {
      click: "onSelectMainMenu_Vehiculos_Modelos",
    },
    "#menu_principal_vehiculos": {
      click: "onSelectMainMenu_Vehiculos",
    },
    //tacografos
    "#menu_principal_tacografos_modelo": {
      click: "onSelectMainMenu_Tacografos_Modelos",
    },
    "#menu_principal_tacografos_categoria": {
      click: "onSelectMainMenu_Tacografos_Categoria",
    },
    "#menu_principal_tacografos": {
      click: "onSelectMainMenu_Tacografos",
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
          Ext.getCmp("menu_principal_tipointervenciones").enable();
          //vehiculo
          Ext.getCmp("menu_principal_vehiculos_marcas").enable();
          Ext.getCmp("menu_principal_vehiculos_modelos").enable();
          Ext.getCmp("menu_principal_vehiculos").enable();
          //tacografos
          Ext.getCmp("menu_principal_tacografos_modelo").enable();
          Ext.getCmp("menu_principal_tacografos_categoria").enable();
          Ext.getCmp("menu_principal_tacografos").enable();
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
        Ext.getCmp("menu_principal_tipointervenciones").enable();
        //vehiculo
        Ext.getCmp("menu_principal_vehiculos_marcas").enable();
        Ext.getCmp("menu_principal_vehiculos_modelos").enable();
        Ext.getCmp("menu_principal_vehiculos").enable();
        //tacografos
        Ext.getCmp("menu_principal_tacografos_modelo").enable();
        Ext.getCmp("menu_principal_tacografos_categoria").enable();
        Ext.getCmp("menu_principal_tacografos").enable();
      },
    });
  },

  onSelectMainMenu_TipoIntervenciones: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];
    Ext.data.StoreManager.lookup("tipointervencion.TipoIntervencionStore").load(
      {
        scope: this,
        callback: (records, operation, success) => {
          d.destroy();
          panel_central.add({
            xtype: "tipointervencion-grid",
          });

          btn.disable();
          Ext.getCmp("menu_principal_clientes").enable();
          Ext.getCmp("menu_principal_centroautorizado").enable();
          //vehiculo
          Ext.getCmp("menu_principal_vehiculos_marcas").enable();
          Ext.getCmp("menu_principal_vehiculos_modelos").enable();
          Ext.getCmp("menu_principal_vehiculos").enable();
          //tacografos
          Ext.getCmp("menu_principal_tacografos_modelo").enable();
          Ext.getCmp("menu_principal_tacografos_categoria").enable();
          Ext.getCmp("menu_principal_tacografos").enable();
        },
      }
    );
  },
  //-------------------------------------------------- Vehiculos --------------------------------------------
  onSelectMainMenu_Vehiculos_Marcas: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];
    Ext.data.StoreManager.lookup("marcavehiculo.MarcaVehiculoStore").load({
      scope: this,
      callback: (records, operation, success) => {
        d.destroy();
        panel_central.add({
          xtype: "marcavehiculo-grid",
        });

        btn.disable();
        Ext.getCmp("menu_principal_clientes").enable();
        Ext.getCmp("menu_principal_centroautorizado").enable();
        Ext.getCmp("menu_principal_tipointervenciones").enable();
        //vehiculo
        // Ext.getCmp("menu_principal_vehiculos_marcas").enable();
        Ext.getCmp("menu_principal_vehiculos_modelos").enable();
        Ext.getCmp("menu_principal_vehiculos").enable();
        //tacografos
        Ext.getCmp("menu_principal_tacografos_modelo").enable();
        Ext.getCmp("menu_principal_tacografos_categoria").enable();
        Ext.getCmp("menu_principal_tacografos").enable();
      },
    });
  },

  onSelectMainMenu_Vehiculos_Modelos: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];
    Ext.data.StoreManager.lookup("modelovehiculo.ModeloVehiculoStore").load({
      scope: this,
      callback: (records, operation, success) => {
        d.destroy();
        panel_central.add({
          xtype: "modelovehiculo-grid",
        });

        btn.disable();
        Ext.getCmp("menu_principal_clientes").enable();
        Ext.getCmp("menu_principal_centroautorizado").enable();
        Ext.getCmp("menu_principal_tipointervenciones").enable();
        //vehiculo
        Ext.getCmp("menu_principal_vehiculos_marcas").enable();
        //Ext.getCmp("menu_principal_vehiculos_modelos").enable();
        Ext.getCmp("menu_principal_vehiculos").enable();
        //tacografos
        Ext.getCmp("menu_principal_tacografos_modelo").enable();
        Ext.getCmp("menu_principal_tacografos_categoria").enable();
        Ext.getCmp("menu_principal_tacografos").enable();
      },
    });
  },

  onSelectMainMenu_Vehiculos: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];
    Ext.data.StoreManager.lookup("vehiculo.VehiculoStore").load({
      scope: this,
      callback: (records, operation, success) => {
        d.destroy();
        panel_central.add({
          xtype: "vehiculo-grid",
        });

        btn.disable();
        Ext.getCmp("menu_principal_clientes").enable();
        Ext.getCmp("menu_principal_centroautorizado").enable();
        Ext.getCmp("menu_principal_tipointervenciones").enable();
        //vehiculo
        Ext.getCmp("menu_principal_vehiculos_marcas").enable();
        Ext.getCmp("menu_principal_vehiculos_modelos").enable();
        // Ext.getCmp("menu_principal_vehiculos").enable();
        //tacografos
        Ext.getCmp("menu_principal_tacografos_modelo").enable();
        Ext.getCmp("menu_principal_tacografos_categoria").enable();
        Ext.getCmp("menu_principal_tacografos").enable();
      },
    });
  },

  //------------------------------------------ Tacografos -----------------------------------------------------

  onSelectMainMenu_Tacografos_Modelos: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];
    Ext.data.StoreManager.lookup("modelotacografo.ModeloTacografoStore").load({
      scope: this,
      callback: (records, operation, success) => {
        d.destroy();
        panel_central.add({
          xtype: "modelotacografo-grid",
        });

        btn.disable();
        Ext.getCmp("menu_principal_clientes").enable();
        Ext.getCmp("menu_principal_centroautorizado").enable();
        Ext.getCmp("menu_principal_tipointervenciones").enable();
        //vehiculo
        Ext.getCmp("menu_principal_vehiculos_marcas").enable();
        Ext.getCmp("menu_principal_vehiculos_modelos").enable();
        Ext.getCmp("menu_principal_vehiculos").enable();
        //tacografos
        // Ext.getCmp("menu_principal_tacografos_modelo").enable();
        Ext.getCmp("menu_principal_tacografos_categoria").enable();
        Ext.getCmp("menu_principal_tacografos").enable();
      },
    });
  },
  onSelectMainMenu_Tacografos_Categoria: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];
    Ext.data.StoreManager.lookup(
      "categoriatacografo.CategoriaTacografoStore"
    ).load({
      scope: this,
      callback: (records, operation, success) => {
        d.destroy();
        panel_central.add({
          xtype: "categoriatacografo-grid",
        });

        btn.disable();
        Ext.getCmp("menu_principal_clientes").enable();
        Ext.getCmp("menu_principal_centroautorizado").enable();
        Ext.getCmp("menu_principal_tipointervenciones").enable();
        //vehiculo
        Ext.getCmp("menu_principal_vehiculos_marcas").enable();
        Ext.getCmp("menu_principal_vehiculos_modelos").enable();
        Ext.getCmp("menu_principal_vehiculos").enable();
        //tacografos
        Ext.getCmp("menu_principal_tacografos_modelo").enable();
        //Ext.getCmp("menu_principal_tacografos_categoria").enable();
        Ext.getCmp("menu_principal_tacografos").enable();
      },
    });
  },
  onSelectMainMenu_Tacografos: (btn) => {
    var panel_central = Ext.ComponentQuery.query("#panel_central")[0];
    var d = panel_central.query("grid")[0];
    Ext.data.StoreManager.lookup("tacografo.TacografoStore").load({
      scope: this,
      callback: (records, operation, success) => {
        d.destroy();
        panel_central.add({
          xtype: "tacografo-grid",
        });

        btn.disable();
        Ext.getCmp("menu_principal_clientes").enable();
        Ext.getCmp("menu_principal_centroautorizado").enable();
        Ext.getCmp("menu_principal_tipointervenciones").enable();
        //vehiculo
        Ext.getCmp("menu_principal_vehiculos_marcas").enable();
        Ext.getCmp("menu_principal_vehiculos_modelos").enable();
        Ext.getCmp("menu_principal_vehiculos").enable();
        //tacografos
        Ext.getCmp("menu_principal_tacografos_modelo").enable();
        Ext.getCmp("menu_principal_tacografos_categoria").enable();
        //Ext.getCmp("menu_principal_tacografos").enable();
      },
    });
  },
});
