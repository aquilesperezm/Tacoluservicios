Ext.define("TCSRV.controller.modelovehiculo.ModeloVehiculoController", {
  extend: "Ext.app.Controller",

  views: [
    "modelovehiculo.ModeloVehiculoView",
    "modelovehiculo.forms.ModeloVehiculoForm",
    "modelovehiculo.addons.ModeloVehiculoMsg",
    "modelovehiculo.addons.ModeloVehiculoComboBox",
  ],
  stores: [
    "modelovehiculo.ModeloVehiculoStore"
  ],

  control: {
    'modelovehiculo-grid toolbar[dock="top"] textfield[fieldLabel="Buscar"]': {
      beforerender: (cmp) => {
        cmp.setEmptyText('Buscar por: Marca o Modelo')
      },
    },

    //click en el boton Adicionar
    'modelovehiculo-grid toolbar[dock="top"] button[text="Adicionar"]': {
      click: "onClickButtonAdicionar",
    },
    //click en el boton Eliminar
    'modelovehiculo-grid toolbar[dock="top"] button[text="Eliminar"]': {
      click: "onClickButtonEliminar",
    },
    //click en el boton Detalles
    'modelovehiculo-grid toolbar[dock="top"] button[text="Detalles"]': {
      click: "onClickButtonDetalles",
    },
    //cuando se actualiza una fila
    "modelovehiculo-grid": {
      edit: "onRowEditModeloVehiculo",
    },
    "#CreateNew_ModeloVehiculo": {
      click: "onClickGuardarNewModeloVehiculo",
    },
  },

  onClickButtonAdicionar: (btn, e) => {
    Ext.create("Ext.window.Window", {
      draggable: false,
      resizable: false,
      modal: true,
      title: "Adicionar un nuevo Modelo de Vehículo",
      items: [
        {
          xtype: "modelovehiculo-form",
        },
      ],
      buttons: [
        {
          text: "Guardar",
          id: "CreateNew_ModeloVehiculo",
        },
      ],
    }).show();
  },

  onClickGuardarNewModeloVehiculo: (btn, e) => {
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
            "modelovehiculo.ModeloVehiculoStore"
          ).load();
        },
        failure: function (form, action) {},
      });
    } else Ext.Msg.alert("Error de Validación","Los campos deben ser válidos");
  },

  // url: "api/3/get_vehiculos",
  onClickButtonEliminar: (btn, e) => {
    let grid = btn.up("modelovehiculo-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    let ids = [];
    selection.forEach((e, i, a) => {
      ids.push(e.data.id);
    });

    if (selection.length > 0) {
      Ext.Msg.show({
        title: "Eliminar Modelos de Vehículos",
        message:
          "Usted desea eliminar los Modelos de Vehículos seleccionadas, ¿Está segur@?",
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
          if (btn === "yes") {
            //proceed to delete

            let store = grid.getStore();

            Ext.Ajax.request({
              method: "POST",
              headers: { Token: "Tacoluservicios2024**" },
              url: "api/3/modelovehiculo_manager",
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
        message: "Debe seleccionar al menos un Modelo de Vehículo",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onClickButtonDetalles: (btn, e) => {
    let grid = btn.up("modelovehiculo-grid", 2);
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
              {
                xtype: "displayfield",
                fieldLabel: "Marca",
                value: selection[0].data.nombre_marca,
              },
              {
                xtype: "displayfield",
                fieldLabel: "Modelo",
                value: selection[0].data.nombre,
              },
            ],
          },
        ],
      }).show();
    } else {
      Ext.Msg.show({
        title: "Error",
        message: "Debe seleccionar un único Modelo de Vehículo",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onRowEditModeloVehiculo: (editor, context) => {
    let grid = context.grid;
    let store = grid.getStore();

    Ext.Ajax.request({
      method: "POST",
      headers: { Token: "Tacoluservicios2024**" },
      url: "api/3/modelovehiculo_manager",
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
