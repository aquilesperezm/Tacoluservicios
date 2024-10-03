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
        displayField: "nombre",
        allowBlank: false,
        //triggerAction: "all"
        valueField: "codcliente",
        store: "cliente.ClienteStore",
        pageSize: 15,
        listConfig: {
          //maxWidth:400,
          minWidth: 350,
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
      },
    },
    {
      text: "Modelo",
      dataIndex: "nombre_modelo",
      flex: 1,
      editor: {
        xtype: "combobox",
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
