Ext.define("TCSRV.view.vehiculo.VehiculoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "vehiculo-grid",
  title: "Vehículos",
  store: "vehiculo.VehiculoStore",
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Matrícula",
      dataIndex: "matricula",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Número de Chasis",
      dataIndex: "no_chasis",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Fecha de Matrícula",
      dataIndex: "fecha_matricula",
      flex: 1,
      editor: {
        xtype: "datefield",
        //allowBlank: false,
      },
    },
    {
      text: "Cliente",
      dataIndex: "nombre_cliente",
      flex: 1,
      editor: {
        xtype: "cliente_combobox",
        fieldLabel: false,
        allowBlank: true,
        name: "codcliente",
        displayField: "nombre",
        valueField: "codcliente",
        //allowBlank: false,
        listeners:{
          change: (cmp,nv,ov)=>{
            let r = cmp.getStore().findRecord('codcliente',nv);
           // console.log(r,nv)
            Ext.getCmp('addvehiculo_editor_cifnif').setValue(r.get('cifnif'))
          }
        }
      },
    },
    {
      text: "CIFNIF / Cliente",
      dataIndex: "cifnif_cliente",
      flex: 1 ,
      editor: {
        xtype: "displayfield",
        id:'addvehiculo_editor_cifnif',
        fieldLabel:false,
        allowBlank: false,
      },
    },
    {
      text: "Marca",
      dataIndex: "nombre_marca",
      flex: 1,
      editor: {
        xtype: "marcavehiculo_combobox",
        id: "addvehiculo_editor_marca",
        fieldLabel: false,
        allowBlank: false,
        listeners: {
          afterrender: (cmp) => {
            let store_modelo = Ext.getCmp(
              "addvehiculo_editor_modelo"
            ).getStore();

            store_modelo.load({
              callback: () => {
                store_modelo.clearFilter();

                store_modelo.addFilter((item) => {
                  return item.data.idmarca == cmp.getValue();
                });
              },
            });
          },
          change: () => {
            let store_modelo = Ext.getCmp(
              "addvehiculo_editor_modelo"
            ).getStore();
            store_modelo.load({
              callback: () => {
                if (store_modelo.getData().length > 0)
                  Ext.getCmp("addvehiculo_editor_modelo").select(
                    store_modelo.getData().getAt(0)
                  );
                else Ext.getCmp("addvehiculo_editor_modelo").setValue("");
              },
            });
          },
        },
      },
    },
    {
      text: "Modelo",
      dataIndex: "nombre_modelo",
      flex: 1,
      editor: {
        xtype: "modelovehiculo_combobox",
        id: "addvehiculo_editor_modelo",
        allowBlank: false,
        fieldLabel: false,
        queryMode: "local",
        queryParam: false,
        allQuery: false,
        /*listeners: {
          afterrender: (cmp) => {
            let store = cmp.getStore();

            store.clearFilter();

            store.addFilter((item) => {
              return (
                item.data.idmarca ==
                Ext.getCmp("addvehiculo_editor_marca").getValue()
              );
            });
          },
        },*/
      },
    },
    {
      text: "Comentarios",
      dataIndex: "comentario",
      flex: 3,
      editor: {
        xtype: "textfield",
      },
    },
  ],
});
