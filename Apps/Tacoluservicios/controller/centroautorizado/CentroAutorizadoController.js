Ext.define("TCSRV.controller.centroautorizado.CentroAutorizadoController", {
  extend: "Ext.app.Controller",

  views: [
    "centroautorizado.CentroAutorizadoView",
    "centroautorizado.forms.CentroAutorizadoForm",
    "centroautorizado.addons.CentroAutorizadoMsg",
  ],
  stores: ["centroautorizado.CentroAutorizadoStore"],

  control: {
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
    let grid = btn.up("centroautorizado-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    if (selection.length > 0) {
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
    } else {
      Ext.Msg.show({
        title: "Error",
        message: "Debe seleccionar al menos un Centro Autorizado",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }
  },

  onClickButtonDetalles: (btn,e)=>{

    let grid = btn.up("centroautorizado-grid", 2);
    let grid_sm = grid.getSelectionModel();
    let selection = grid_sm.getSelection();

    if (selection.length == 1) {

      Ext.create('Ext.window.Window',{
        modal:true,
        title:'Detalles',
        items:[{
          xtype:'form',
          defaults:{
            padding:20
          },
          items:[{
            xtype:'displayfield',
            fieldLabel:'Código',
            value:selection[0].data.codigo
          },{
            xtype:'displayfield',
            fieldLabel:'Nombre',
            value:selection[0].data.nombre
          }]
        }]

      }).show();


    }else {
      Ext.Msg.show({
        title: "Error",
        message: "Debe seleccionar un único Centro Autorizado",
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR,
      });
    }

  },

  init: (app) => {},
});
