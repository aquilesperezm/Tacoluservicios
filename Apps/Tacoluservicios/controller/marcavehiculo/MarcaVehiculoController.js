Ext.define("TCSRV.controller.marcavehiculo.MarcaVehiculoController", {
  extend: "Ext.app.Controller",

  views: [
    "marcavehiculo.MarcaVehiculoView",
    "marcavehiculo.forms.MarcaVehiculoForm",
    "marcavehiculo.addons.MarcaVehiculoMsg",
  ],
  stores: [
    "marcavehiculo.MarcaVehiculoStore"
  ],

  control: {
    'marcavehiculo-grid toolbar[dock="top"] textfield[fieldLabel="Buscar"]': {
      beforerender: (cmp) => {
        cmp.setEmptyText('Buscar por: Nombre')
      },
    },

    //click en el boton Adicionar
    'marcavehiculo-grid toolbar[dock="top"] button[text="Adicionar"]': {
      click: "onClickButtonAdicionar",
    },
    //click en el boton Eliminar
    'marcavehiculo-grid toolbar[dock="top"] button[text="Eliminar"]': {
      click: "onClickButtonEliminar",
    },
    //click en el boton Detalles
    'marcavehiculo-grid toolbar[dock="top"] button[text="Detalles"]': {
      click: "onClickButtonDetalles",
    },
    //cuando se actualiza una fila
    "marcavehiculo-grid": {
      edit: "onRowEditMarcaVehiculo",
    },
    "#CreateNew_MarcaVehiculo": {
      click: "onClickGuardarNewMarcaVehiculo",
    },
  },

  onClickButtonAdicionar: (btn, e) => {
    Ext.create("Ext.window.Window", {
      draggable: false,
      resizable: false,
      modal: true,
      title: "Adicionar una nueva Marca de Vehículo",
      items: [
        {
          xtype: "marcavehiculo-form",
        },
      ],
      buttons: [
        {
          text: "Guardar",
          id: "CreateNew_MarcaVehiculo",
        },
      ],
    }).show();
  },

  onClickGuardarNewMarcaVehiculo: (btn, e) => {
    let window = btn.up("window");
    let form_panel = window.down("form");

    if (form_panel.getForm().isValid()) {
      form_panel.getForm().submit({
        clientValidation: true,
        headers: { Token: "Tacoluservicios2024**" },
        params: {
          action: "create",
        },
        success: function (form, action) {
          window.close();
          Ext.StoreManager.lookup(
            "marcavehiculo.MarcaVehiculoStore"
          ).load();
        },
        failure: function (form, action) {},
      });
    } else Ext.Msg.alert("Error de Validación","Los campos deben ser válidos");
  },

  // url: "api/3/get_vehiculos",
  onClickButtonEliminar: (btn, e) => {
    let grid = btn.up("marcavehiculo-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    let ids = [];
    selection.forEach((e, i, a) => {
      ids.push(e.data.id);
    });

    if (selection.length > 0) {
      Ext.Msg.show({
        title: "Eliminar Tipos de Intervenciones",
        message:
          "Usted desea eliminar las Marcas de Vehículos seleccionadas, ¿Está segur@?",
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
          if (btn === "yes") {
            //proceed to delete

            let store = grid.getStore();

            Ext.Ajax.request({
              method: "POST",
              headers: { Token: "Tacoluservicios2024**" },
              url: "api/3/marcavehiculo_manager",
              params: {
                action: "delete",
                records_ids_delete: Ext.encode(ids),
              },
              success: (response) => {
                store.load();
              },
              failure: (response) => {},
            });
          } else if (btn === "no") {
            grid.getStore().load();
          }
        },
      });
    } else {
      Ext.Msg.show({
        title: "Error",
        message: "Debe seleccionar al menos una Marca de Vehículo",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onClickButtonDetalles: (btn, e) => {
    let grid = btn.up("marcavehiculo-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    if (selection.length == 1) {
      Ext.create("Ext.window.Window", {
        modal: true,
        title: "Detalles",
        items: [
          {
            xtype: "form",
            defaults: {
              padding: 20,
            },
            items: [
              /*{
                xtype: "displayfield",
                fieldLabel: "Código",
                value: selection[0].data.codigo,
              },*/
              {
                xtype: "displayfield",
                fieldLabel: "Nombre",
                value: selection[0].data.nombre,
              },
            ],
          },
        ],
      }).show();
    } else {
      Ext.Msg.show({
        title: "Error",
        message: "Debe seleccionar un única Marca de Vehículo",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onRowEditMarcaVehiculo: (editor, context) => {
    let grid = context.grid;
    let store = grid.getStore();

    Ext.Ajax.request({
      method: "POST",
      headers: { Token: "Tacoluservicios2024**" },
      url: "api/3/marcavehiculo_manager",
      params: {
        action: "update",
        record_updated: Ext.encode(context.record.data),
      },
      success: (response) => {
        store.load();
      },
      failure: (response) => {},
    });
  },

  init: (app) => {},
});
