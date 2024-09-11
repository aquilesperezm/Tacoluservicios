Ext.define("TCSRV.controller.cliente.ClienteController", {
  extend: "Ext.app.Controller",

  views: [
    "cliente.ClienteView",
    "cliente.forms.ClienteForm",
    "cliente.addons.ClienteMsg",
    "centroautorizado.addons.CentroAutorizadoComboBox",
  ],
  stores: ["cliente.ClienteStore"],

  control: {
    'cliente-grid toolbar[dock="top"] textfield[fieldLabel="Buscar"]': {
      afterrender: (cmp) => {
        cmp.setEmptyText("Buscar por: Nombre, Correo Electrónico, Número Fiscal, Teléfono ó Centro Autorizado")
        
      },
    },

    //click en el boton Adicionar
    'cliente-grid toolbar[dock="top"] button[text="Adicionar"]': {
      click: "onClickButtonAdicionar",
    },
    //click en el boton Eliminar
    'cliente-grid toolbar[dock="top"] button[text="Eliminar"]': {
      click: "onClickButtonEliminar",
    },
    //click en el boton Detalles
    'cliente-grid toolbar[dock="top"] button[text="Detalles"]': {
      click: "onClickButtonDetalles",
    },
    //cuando se actualiza una fila
    "cliente-grid": {
      edit: "onRowEditcliente",
    },
    "#CreateNew_cliente": {
      click: "onClickGuardarNewcliente",
    },
  },

  onClickButtonAdicionar: (btn, e) => {
    Ext.create("Ext.window.Window", {
      draggable: false,
      resizable: false,
      modal: true,
      title: "Adicionar un nuevo Cliente",
      items: [
        {
          xtype: "cliente-form",
        },
      ],
      buttons: [
        {
          text: "Guardar",
          id: "CreateNew_cliente",
        },
      ],
    }).show();
  },

  onClickGuardarNewcliente: (btn, e) => {
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
          Ext.StoreManager.lookup("cliente.ClienteStore").load();
        },
        failure: function (form, action) {},
      });
    } else Ext.Msg.alert("Error de Validación", "Los campos deben ser válidos");
  },

  // url: "api/3/get_vehiculos",
  onClickButtonEliminar: (btn, e) => {
    let grid = btn.up("cliente-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    let ids = [];
    selection.forEach((e, i, a) => {
      ids.push(e.data.codcliente);
    });

    if (selection.length > 0) {
      Ext.Msg.show({
        title: "Eliminar Clientes",
        message:
          "Usted desea eliminar los Clientes seleccionados, ¿Está segur@?",
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
          if (btn === "yes") {
            //proceed to delete

            let store = grid.getStore();

            Ext.Ajax.request({
              method: "POST",
              headers: { Token: "Tacoluservicios2024**" },
              url: "api/3/cliente_manager",
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
        message: "Debe seleccionar al menos un Cliente",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onClickButtonDetalles: (btn, e) => {
    let grid = btn.up("cliente-grid", 2);
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
        message: "Debe seleccionar un único Cliente",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onRowEditcliente: (editor, context) => {
    let grid = context.grid;
    let store = grid.getStore();

    //console.log(context.record.data);

    Ext.Ajax.request({
      method: "POST",
      headers: { Token: "Tacoluservicios2024**" },
      url: "api/3/cliente_manager",
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
