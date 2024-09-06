Ext.define("TCSRV.controller.centroautorizado.CentroAutorizadoController", {
  extend: "Ext.app.Controller",

  views: [
    "centroautorizado.CentroAutorizadoView",
    "centroautorizado.forms.CentroAutorizadoForm",
    "centroautorizado.addons.CentroAutorizadoMsg",
  ],
  stores: ["centroautorizado.CentroAutorizadoStore"],

  control: {
    'centroautorizado-grid toolbar[dock="top"] button[text="Adicionar"]': {
      click: "onClickButtonAdicionar",
    },
    'centroautorizado-grid toolbar[dock="top"] button[text="Eliminar"]': {
      click: "onClickButtonEliminar",
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
        },
      ],
    }).show();
  },

  // url: "api/3/get_vehiculos",
  onClickButtonEliminar: (btn, e) => {
    Ext.Msg.show({
      title: "Eliminar Centros Autorizados",
      message:
        "Usted desea eliminar los Centros Autorizados seleccionados, ¿Está segur@?",
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.WARNING,
      fn: function (btn) {
        if (btn === "yes") {
          console.log("Yes pressed");
        } else if (btn === "no") {
          console.log("No pressed");
        }
      },
    });
  },

  init: (app) => {},
});
