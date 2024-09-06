Ext.define("TCSRV.controller.cliente.ClienteController", {
  extend: "TCSRV.controller.base.BaseController",

  views: ["cliente.ClienteView"],
  models: [],
  stores: [],

  control: {
    'grid-cliente > toolbar[dock="top"] > button:first ': {
      click: "onClick_AdicionarCliente",
    },
  },

  onClick_AdicionarCliente: (btn, e) => {
    Ext.create("Ext.window.Window", {
      title: "Add Cliente",
      width: 700,
      height: 400,
      modal: true,
      resizable:false,
      draggable:false,
      items: [
        {
          xtype: "form",
          items: [
            {
              xtype: "container",
              layout: "hbox",

              defaults: {
                padding: 20,
              },
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "Código",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "Nombre",
                },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",

              defaults: {
                padding: 20,
              },
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "Número Fiscal",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "Email",
                },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",

              defaults: {
                padding: 20,
              },
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "Teléfono",
                },
                {
                  xtype: "combobox",
                  fieldLabel: "Centro Autorizado",
                },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",

              defaults: {
                padding: 20,
              },
              items: [
                {
                  xtype: "textarea",
                  fieldLabel: "Observaciones",
                  width: 600,
                },
              ],
            },
          ],
        },
      ],

      buttons: [
        {
          text: "Guardar",
        },
      ],
    }).show();
  },

  init: (app) => {},
});
