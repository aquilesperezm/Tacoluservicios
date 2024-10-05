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
      xtype: "datecolumn",
      format: "d-m-Y",
      dataIndex: "fecha_matricula",
      flex: 1,
      editor: {
        xtype: "datefield",
      },
    },
    {
      text: "Cliente",
      dataIndex: "nombre_cliente",
      flex: 1,
      editor: {
        xtype: "combobox",
        store: "cliente.clienteStore",
        allowBlank: false,
        displayField: "nombre",
        valueField: "nombre",
        store: "cliente.ClienteStore",
        pageSize: 15,
        listConfig: {
          minWidth: 350,
        },
        listeners: {
          select: (cmp, record) => {
            let grid_clientes = cmp.up("grid");
            let selected_record = grid_clientes
              .getSelectionModel()
              .getSelection();
            //console.log("selected: ", selected_record);
            //console.log("selected cliente: ", record);
            selected_record[0].set("codcliente", record.get("codcliente"));
          },
        },
      },
    },
    {
      text: "CIFNIF / Cliente",
      dataIndex: "cifnif_cliente",
      flex: 1,
      editor: {
        xtype: "displayfield",
        id: "addvehiculo_editor_cifnif",
        fieldLabel: false,
        allowBlank: false,
      },
    },
    {
      text: "Marca",
      dataIndex: "nombre_marca",
      flex: 1,
      editor: {
        xtype: "combobox",
        store: "marcavehiculo.MarcaVehiculoStore",
        allowBlank: false,
        displayField: "nombre",
        valueField: "nombre",
        pageSize: 15,
        listConfig: {
          minWidth: 350,
        },
        listeners: {
          select: (cmp, record) => {
            let store_modelos = Ext.data.StoreManager.lookup(
              "modelovehiculo.ModeloVehiculoStore"
            );
            store_modelos.clearFilter();
            var marcaFilter = new Ext.util.Filter({
              filterFn: function (item) {
                return item.data.idmarca == record.data.id;
              },
            });
            store_modelos.addFilter(marcaFilter);
            store_modelos.load({
              callback: (records, operation, success) => {
                let editor = Ext.getCmp("vehiculo_update_modelo");
                let data = store_modelos.getData();

                if (data.length > 0) {
                  // select firt value
                  editor.setValue(data.getAt(0).get("nombre"));

                  let grid_clientes = cmp.up("grid");
                  let selected_record = grid_clientes
                    .getSelectionModel()
                    .getSelection();
                  //console.log("selected: ", selected_record);
                  //console.log("selected cliente: ", record);
                  selected_record[0].set("idmodelo", data.getAt(0).get("id"));

                } else editor.setValue("");
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
        xtype: "combobox",
        store: "modelovehiculo.ModeloVehiculoStore",
        id: "vehiculo_update_modelo",
        allowBlank: false,
        displayField: "nombre",
        valueField: "nombre",
        pageSize: 15,
        listConfig: {
          minWidth: 350,
        },
        listeners: {
          select: (cmp, record) => {
             let grid_clientes = cmp.up("grid");
                  let selected_record = grid_clientes
                    .getSelectionModel()
                    .getSelection();
                  //console.log("selected: ", selected_record);
                  //console.log("selected cliente: ", record);
                  selected_record[0].set("idmodelo", record.get("id"));
          },
        },
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
