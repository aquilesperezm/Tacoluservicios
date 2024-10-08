Ext.define("TCSRV.controller.centroautorizado.CentroAutorizadoController", {
  extend: "Ext.app.Controller",

  views: [
    "centroautorizado.CentroAutorizadoView",
    "centroautorizado.forms.CentroAutorizadoForm",
    "centroautorizado.addons.CentroAutorizadoMsg",
    "centroautorizado.addons.CentroAutorizadoComboBox",
  ],
  stores: [
    "centroautorizado.CentroAutorizadoStore"
  ],

  control: {
    'centroautorizado-grid toolbar[dock="top"] textfield[fieldLabel="Buscar"]': {
      beforerender: (cmp) => {
        cmp.setEmptyText('Buscar por: Código ó Nombre')
      },
    },

    //click en el boton Adicionar
    'centroautorizado-grid toolbar[dock="top"] button[text="Adicionar"]': {
      click: "onClickButtonAdicionar",
    },
    //click en el boton Eliminar
    'centroautorizado-grid toolbar[dock="top"] button[text="Eliminar"]': {
      click: "onClickButtonEliminar",
    },
    //click en el boton Detalles
    'centroautorizado-grid toolbar[dock="top"] button[text="Detalles"]': {
      click: "onClickButtonDetalles",
    },
    //cuando se actualiza una fila
    "centroautorizado-grid": {
      edit: "onRowEditCentroAutorizado",
    },
    "#CreateNew_CentroAutorizado": {
      click: "onClickGuardarNewCentroAutorizado",
    },
  },

  onClickButtonAdicionar: (btn, e) => {
    Ext.create("Ext.window.Window", {
      draggable: false,
      resizable: false,
      modal: true,
      title: "Adicionar un nuevo Centro Autorizado",
      items: [
        {
          xtype: "centroautorizado-form",
        },
      ],
      buttons: [
        {
          text: "Guardar",
          id: "CreateNew_CentroAutorizado",
        },
      ],
    }).show();
  },

  onClickGuardarNewCentroAutorizado: (btn, e) => {
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
            "centroautorizado.CentroAutorizadoStore"
          ).load();
        },
        failure: function (form, action) {},
      });
    } else Ext.Msg.alert("Error de Validación","Los campos deben ser válidos");
  },

  // url: "api/3/get_vehiculos",
  onClickButtonEliminar: (btn, e) => {
    let grid = btn.up("centroautorizado-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    let ids = [];
    selection.forEach((e, i, a) => {
      ids.push(e.data.id);
    });

    if (selection.length > 0) {
      Ext.Msg.show({
        title: "Eliminar Centros Autorizados",
        message:
          "Usted desea eliminar los Centros Autorizados seleccionados, ¿Está segur@?",
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
          if (btn === "yes") {
            //proceed to delete

            let store = grid.getStore();

            Ext.Ajax.request({
              method: "POST",
              headers: { Token: "Tacoluservicios2024**" },
              url: "api/3/centroautorizado_manager",
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
        message: "Debe seleccionar al menos un Centro Autorizado",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onClickButtonDetalles: (btn, e) => {
    let grid = btn.up("centroautorizado-grid", 2);
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
                fieldLabel: "Código",
                value: selection[0].data.codigo,
              },
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
        message: "Debe seleccionar un único Centro Autorizado",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onRowEditCentroAutorizado: (editor, context) => {
    let grid = context.grid;
    let store = grid.getStore();

    Ext.Ajax.request({
      method: "POST",
      headers: { Token: "Tacoluservicios2024**" },
      url: "api/3/centroautorizado_manager",
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
