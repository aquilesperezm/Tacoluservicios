Ext.define("TCSRV.controller.modelotacografo.ModeloTacografoController", {
  extend: "Ext.app.Controller",

  views: [
    "modelotacografo.ModeloTacografoView",
    "modelotacografo.forms.ModeloTacografoForm",
    "modelotacografo.addons.ModeloTacografoMsg",
    "modelotacografo.addons.ModeloTacografoComboBox"

  ],
  stores: [
    "modelotacografo.ModeloTacografoStore"
  ],

  control: {
    'modelotacografo-grid toolbar[dock="top"] textfield[fieldLabel="Buscar"]': {
      beforerender: (cmp) => {
        cmp.setEmptyText('Buscar por: Nombre')
      },
    },

    //click en el boton Adicionar
    'modelotacografo-grid toolbar[dock="top"] button[text="Adicionar"]': {
      click: "onClickButtonAdicionar",
    },
    //click en el boton Eliminar
    'modelotacografo-grid toolbar[dock="top"] button[text="Eliminar"]': {
      click: "onClickButtonEliminar",
    },
    //click en el boton Detalles
    'modelotacografo-grid toolbar[dock="top"] button[text="Detalles"]': {
      click: "onClickButtonDetalles",
    },
    //cuando se actualiza una fila
    "modelotacografo-grid": {
      edit: "onRowEditModeloTacografo",
    },
    "#CreateNew_ModeloTacografo": {
      click: "onClickGuardarNewModeloTacografo",
    },
  },

  onClickButtonAdicionar: (btn, e) => {
    Ext.create("Ext.window.Window", {
      draggable: false,
      resizable: false,
      modal: true,
      title: "Adicionar un nuevo Modelo de Tacógrafo",
      items: [
        {
          xtype: "modelotacografo-form",
        },
      ],
      buttons: [
        {
          text: "Guardar",
          id: "CreateNew_ModeloTacografo",
        },
      ],
    }).show();
  },

  onClickGuardarNewModeloTacografo: (btn, e) => {
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
            "modelotacografo.ModeloTacografoStore"
          ).load();
        },
        failure: function (form, action) {},
      });
    } else Ext.Msg.alert("Error de Validación","Los campos deben ser válidos");
  },

  // url: "api/3/get_vehiculos",
  onClickButtonEliminar: (btn, e) => {
    let grid = btn.up("modelotacografo-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    let ids = [];
    selection.forEach((e, i, a) => {
      ids.push(e.data.id);
    });

    if (selection.length > 0) {
      Ext.Msg.show({
        title: "Eliminar Modelo de Tacógrafos",
        message:
          "Usted desea eliminar los Modelos de Tacógrafos seleccionadas, ¿Está segur@?",
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
          if (btn === "yes") {
            //proceed to delete

            let store = grid.getStore();

            Ext.Ajax.request({
              method: "POST",
              headers: { Token: "Tacoluservicios2024**" },
              url: "api/3/modelotacografo_manager",
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
        message: "Debe seleccionar al menos un Modelo de Tacógrafo",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onClickButtonDetalles: (btn, e) => {
    let grid = btn.up("modelotacografo-grid", 2);
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
        message: "Debe seleccionar un único Modelo de Tacógrafo",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onRowEditModeloTacografo: (editor, context) => {
    let grid = context.grid;
    let store = grid.getStore();

    Ext.Ajax.request({
      method: "POST",
      headers: { Token: "Tacoluservicios2024**" },
      url: "api/3/modelotacografo_manager",
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
