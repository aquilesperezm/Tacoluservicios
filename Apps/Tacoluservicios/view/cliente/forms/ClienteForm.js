Ext.define("TCSRV.view.cliente.forms.ClienteForm", {
  extend: "Ext.form.Panel",
  xtype: "cliente-form",
  //title: "Adicionar Centro Autorizado",

  method: "POST",

  url: "api/3/cliente_manager",
  layout: {
    type: "table",
    columns: 2,
  },

  items: [
    {
      xtype: "container",
      defaults: {
        padding: 20,
      },
      items: [
        {
          xtype: "textfield",
          fieldLabel: "Código CIF/NIF",
          allowBlank: false,
          name: "cifnif",
          listeners: {
            render: (cmp) => {
              cmp.focus();
            },
          },
        },
        {
          xtype: "textfield",
          fieldLabel: "Nombre",
          allowBlank: false,
          name: "nombre",
        },
        {
          xtype: "textfield",
          fieldLabel: "Correo Electrónico",
          allowBlank: false,
          name: "email",
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
          xtype: "textfield",
          fieldLabel: "Teléfono",
          //allowBlank: false,
          name: "telefono1"
        },
        {
          xtype: "centroautorizado_combobox",
          fieldLabel: "Centro Autorizado",
          allowBlank: false,
          name: "centroautorizado",
        },
        {
          xtype: "textarea",
          fieldLabel: "Observaciones",
          //allowBlank: false,
          name: "observaciones",
        },
      ],
    },
  ],
});
