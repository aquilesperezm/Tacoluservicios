Ext.define("TCSRV.view.dashboard.DashBoardView", {
  extend: "Ext.container.Viewport",
  layout: "border",
  items: [
    {
      region: "north",
      html: '<h1 class="x-panel-header">Page Title</h1>',
      border: false,
      margin: "0 0 5 0",
    },
    {
      region: "center",
      id:'panel_central',
      toolbar: "",
      title: "TACOLUSERVICIOS 1.00",
      tbar: [
        {
          xtype: "button",
          text: "Nomencladores",
          padding: 5,
          menu: {
            defaults: {
              padding: 2,
            },
            items: [
              
              {
                text: "Centros Autorizados",
                id:'menu_principal_centroautorizado'

                // width:150
              },{
                text: "Clientes",
                id:'menu_principal_clientes'

                // width:150
              },
              {
                text: "Tipos de Intervenciones",
                id:'menu_principal_tipointervenciones'
                //  width:150
              },
              {
                text: "Vehículos",
                menu: {
                  defaults: {
                    padding: 2,
                  },
                  items: [
                    {
                      text: "Marcas",
                    },
                    {
                      text: "Modelos",
                    },
                    {
                      text: "Vehiculos",
                    },
                  ],
                },
                //  width:150
              },
              {
                text: "Tacógrafos",
                defaults: {
                  padding: 2,
                },
                menu: {
                  items: [
                    {
                      text: "Modelos de Tacógrafos",
                    },
                    {
                      text: "Categorías de Tacógrafos",
                    },
                    {
                      text: "Tacógrafos",
                    },
                  ],
                },
              },
            ],
          },
        },
        { xtype: "button", text: "Ordenes de Trabajo", padding: 5 },
      ],
      items: [{
         xtype:'tacografo-grid'
      }],
    },
  ],
});
