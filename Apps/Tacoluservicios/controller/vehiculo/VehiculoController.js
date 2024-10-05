Ext.define("TCSRV.controller.vehiculo.VehiculoController", {
  extend: "Ext.app.Controller",

  views: [
    "vehiculo.VehiculoView",
    "vehiculo.forms.VehiculoForm",
    "vehiculo.addons.VehiculoMsg",
  ],
  stores: ["vehiculo.VehiculoStore"],

  control: {
    'vehiculo-grid toolbar[dock="top"] textfield[fieldLabel="Buscar"]': {
      beforerender: (cmp) => {
        cmp.setEmptyText(
          "Buscar por: Matrícula, Número de Chasis, ID Cliente, Marca o Modelo"
        );
      },
    },

    //click en el boton Adicionar
    'vehiculo-grid toolbar[dock="top"] button[text="Adicionar"]': {
      click: "onClickButtonAdicionar",
    },
    //click en el boton Eliminar
    'vehiculo-grid toolbar[dock="top"] button[text="Eliminar"]': {
      click: "onClickButtonEliminar",
    },
    //click en el boton Detalles
    'vehiculo-grid toolbar[dock="top"] button[text="Detalles"]': {
      click: "onClickButtonDetalles",
    },
    //cuando se actualiza una fila
    "vehiculo-grid": {
      edit: "onRowEditVehiculo",
    },
    "#CreateNew_Vehiculo": {
      click: "onClickGuardarNewVehiculo",
    },
  },

  onClickButtonAdicionar: (btn, e) => {
    Ext.create("Ext.window.Window", {
      draggable: false,
      resizable: false,
      modal: true,
      title: "Adicionar un nuevo Vehículo",
      items: [
        {
          xtype: "vehiculo-form",
        },
      ],
      buttons: [
        {
          text: "Guardar",
          id: "CreateNew_Vehiculo",
        },
      ],
    }).show();
  },

  onClickGuardarNewVehiculo: (btn, e) => {
    let window = btn.up("window");
    let form_panel = window.down("form");

    if (form_panel.getForm().isValid()) {
      form_panel.getForm().submit({
        submitEmptyText: false,
        clientValidation: true,
        headers: { Token: "Tacoluservicios2024**" },
        params: {
          action: "create",
        },
        success: function (form, action) {
          Ext.StoreManager.lookup("vehiculo.VehiculoStore").load({
            callback: () => {
              window.close();
              let store_modelosvehiculo = Ext.data.StoreManager.lookup(
                "modelovehiculo.ModeloVehiculoStore"
              );
              store_modelosvehiculo.clearFilter();
            },
          });
        },
        failure: function (form, action) {},
      });
    } else Ext.Msg.alert("Error de Validación", "Los campos deben ser válidos");
  },

  // url: "api/3/get_vehiculos",
  onClickButtonEliminar: (btn, e) => {
    let grid = btn.up("vehiculo-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    let ids = [];
    selection.forEach((e, i, a) => {
      ids.push(e.data.id);
    });

    if (selection.length > 0) {
      Ext.Msg.show({
        title: "Eliminar Vehículos",
        message:
          "Usted desea eliminar los Vehículos seleccionados, ¿Está segur@?",
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
          if (btn === "yes") {
            //proceed to delete

            let store = grid.getStore();

            Ext.Ajax.request({
              method: "POST",
              headers: { Token: "Tacoluservicios2024**" },
              url: "api/3/vehiculo_manager",
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
        message: "Debe seleccionar al menos un Vehículo",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onClickButtonDetalles: (btn, e) => {
    let grid = btn.up("vehiculo-grid", 2);
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
            layout: {
              type: "table",
              columns: 3,
            },
            items: [
              {
                xtype: "container",
                defaults: {
                  padding: 10,
                  labelWidth:200
                },
                items: [
                  {
                    xtype: "displayfield",
                    fieldLabel: "<b>Matrícula</b>",
                    name: "matricula",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "<b>Número de Chasis</b>",
                    name: "no_chasis",
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "<b>Fecha de Matrícula</b>",
                    name: "fecha_matricula",
                    renderer: (value, field) => {
                      let dt = new Date(value);
                      return Ext.Date.format(dt, "d-m-Y");
                    },
                  },
                ],
              },
              {
                xtype: "container",
                defaults: {
                  padding: 20,
                },
                items: [
                  {
                    xtype: "displayfield",
                    fieldLabel: "<b>Cliente</b>",
                    name:'nombre_cliente'
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "<b>Marca</b>",
                    name:'nombre_marca'
                  },
                  {
                    xtype: "displayfield",
                    fieldLabel: "<b>Modelo</b>",
                    name:'nombre_modelo'
                  },
                ],
              },
              {
                xtype: "container",
                rowspan: 3,
                defaults: {
                  padding: 0,
                },
                items: [
                  {
                    xtype: "textarea",
                    editable: false,
                    fieldLabel: "<b>Comentarios</b>",
                    height: 130,
                    name:'comentario'
                  },
                ],
              },
            ],
            listeners: {
              beforerender: (cmp) => {
                cmp.loadRecord(selection[0]);
              },
            },
          },
        ],
      }).show();
    } else {
      Ext.Msg.show({
        title: "Error",
        message: "Debe seleccionar un único Vehículo",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onRowEditVehiculo: (editor, context) => {
    let grid = context.grid;
    let store = grid.getStore();

    context.record.data.comentario = context.newValues.comentario;

    Ext.Ajax.request({
      method: "POST",
      headers: { Token: "Tacoluservicios2024**" },
      url: "api/3/vehiculo_manager",
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
