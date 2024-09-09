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

                // width:150
              },{
                text: "Clientes",

                // width:150
              },
              {
                text: "Tipos de Intervenciones",
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
         xtype:'cliente-grid'
      }],
    },
  ],
});
