Ext.define("TCSRV.view.vehiculo.forms.VehiculoForm", {
  extend: "Ext.form.Panel",
  xtype: "vehiculo-form",
  //title: "Adicionar Centro Autorizado",

  defaults: {
    padding: 20,
  },

  method: "POST",

  url: "api/3/vehiculo_manager",
  layout: {
    type: "table",
    columns: 3,
  },
  items: [
    {
      xtype: "container",
      defaults: {
        padding: 10,
      },
      items: [
        {
          xtype: "textfield",
          fieldLabel:
            "<span style='color:red;'><strong>*</strong></span> Matrícula",
          allowBlank: false,
          name: "matricula",
          listeners: {
            render: (cmp) => {
              cmp.focus();
            },
          },
        },
        {
          xtype: "textfield",
          fieldLabel:
            "<span style='color:red;'><strong>*</strong></span> Número de Chasis",
          allowBlank: false,
          name: "no_chasis",
        },
        {
          xtype: "datefield",
          fieldLabel: "Fecha de Matrícula",
          //allowBlank: false,
          name: "fecha_matricula",
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
          xtype: "cliente_combobox",
          fieldLabel: "Cliente",
          allowBlank: true,
          name: "codcliente",
          displayField: "nombre",
          valueField: "codcliente",
        },
        {
          xtype: "marcavehiculo_combobox",
          fieldLabel:
            "<span style='color:red;'><strong>*</strong></span> Marca",
          allowBlank: false,
          name: "marca",
          listeners: {
            select: (cmb, record) => {},
            change: (cmb, nv, ov) => {
              if (nv == null) cmb.nextSibling("combobox").setDisabled(true);

              let store_modelosvehiculo = Ext.data.StoreManager.lookup(
                "modelovehiculo.ModeloVehiculoStore"
              );

              store_modelosvehiculo.load({
                callback: (records, operation, success) => {
                  store_modelosvehiculo.clearFilter();

                  store_modelosvehiculo.addFilter([
                    (item) => {
                      // console.log("item: ", item);
                      return item.data.idmarca == nv;
                    },
                  ]);

                  let cmb_modelo = cmb.nextSibling("combobox");
                  cmb_modelo.setDisabled(false);

                  let r = store_modelosvehiculo.getData();
                  // console.log(r.getAt(0).get('id'))
                  cmb_modelo.select(r.getAt(0));
                },
              });
            },
          },
        },
        {
          xtype: "modelovehiculo_combobox",
          fieldLabel:
            "<span style='color:red;'><strong>*</strong></span> Modelo",
          allowBlank: false,
          name: "modelo",
          queryMode: "local",
          disabled: true,
          queryParam: false,
          allQuery: false,
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
          fieldLabel: "Comentarios",
          // allowBlank: false,
          name: "comentarios",
          height: 130,
        },
      ],
    },
  ],
});
