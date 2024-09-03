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
      items: [
        {
          xtype: "grid",
          padding: 20,
          border: 1,
          title: "Centros Autorizados",
          height: 500,
          columnLines: true,
          plugins: {
            rowediting: {
              clicksToMoveEditor: 1,
              autoCancel: false,
            },
          },
          selModel: {
            type: "checkboxmodel",
            checkOnly: false,
          },
          columns: [
            {
              xtype: "rownumberer",
            },
            {
              text: "Nombre",
              dataIndex: "name",
              flex: 1,
              editor: {
                  xtype: 'textfield',
                  allowBlank: false
              }
            },
            {
              text: "Email",
              dataIndex: "email",
              flex: 1,
              editor: {
                  xtype: 'textfield',
                  allowBlank: false
              }
            },
            {
              text: "Phone",
              dataIndex: "phone",
              flex: 1,
              editor: {
                  xtype: 'textfield',
                  allowBlank: false
              }
            },
          ],
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "email", "phone"],
            data: [
              {
                name: "Lisa",
                email: "lisa@simpsons.com",
                phone: "555-111-1224",
              },
              {
                name: "Bart",
                email: "bart@simpsons.com",
                phone: "555-222-1234",
              },
              {
                name: "Homer",
                email: "homer@simpsons.com",
                phone: "555-222-1244",
              },
              {
                name: "Marge",
                email: "marge@simpsons.com",
                phone: "555-222-1254",
              },
            ],
          }),
          tbar: [
            {
              text: "Adicionar",
            },
            "-",
            {
              text: "Eliminar",
            },
            "-",
            {
              text: "Detalles",
            },
            "-",
            {
              text: "Imprimir",
            },
            "-",
            {
              xtype: "textfield",
              fieldLabel: "Buscar",
              labelWidth: 50,
              width: 400,
            },
          ],

          bbar: {
            xtype: "pagingtoolbar",
            displayInfo: true,
            plugins: {
              "ux-progressbarpager": true,
            },
            items: [
              "-",
              {
                xtype: "numberfield",
                fieldLabel: "Items / Página",
                labelWidth: 90,
                width: 165,
                value: 50,
              },
            ],
          },
        },
      ],
    },
  ],
});
