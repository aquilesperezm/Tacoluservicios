Ext.define("TCSRV.controller.cliente.ClienteController", {
  extend: "TCSRV.controller.base.BaseController",

  views: ["cliente.ClienteView"],
  models: [],
  stores: [],

  control:{
    'grid-cliente > toolbar[dock="top"] > button:first ':{
        click: 'onClick_AdicionarCliente'
    }
  },
 
  onClick_AdicionarCliente: (btn, e) => {
    console.log("Cliente");
    // this.callParent();
  },

  init: (app) => {},
});
