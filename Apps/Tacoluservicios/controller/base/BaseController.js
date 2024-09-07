Ext.define("TCSRV.controller.base.BaseController", {
  extend: "Ext.app.Controller",

  views: ["base.BaseGridView"],
  models: [],
  stores: [],

  control: {
    //change page size
    'grid toolbar[dock="bottom"] numberfield[fieldLabel="Items / Página"]': {
      change: "onChangePageSizer",
    },
    //search something
    'grid toolbar[dock="top"] textfield[fieldLabel="Buscar"]': {
      keyup: "onEnterTextSearching",
      specialkey: "onEnterTextSearching",
    }
  },

  onEnterTextSearching: (cmp, e) => {
    let grid = cmp.up("grid", 2);
    let store = grid.getStore();
    let query_str = Ext.String.trim(cmp.getValue());

    if (query_str != "" && query_str.length > 0) {
      store.getProxy().setConfig({
        extraParams: {
          action: "search",
          query: query_str,
        },
      });
      store.load();
    } else {
      store.getProxy().setConfig({
        extraParams: {
          action: "read",
        },
      });
      store.load();
    }
  },

  onChangePageSizer: (cmp, nv, ov, e) => {
    let store = cmp.up("grid", 2).getStore();
    store
      .setConfig({
        pageSize: nv,
      })
      .load();
  },

  init: (app) => {},
});
