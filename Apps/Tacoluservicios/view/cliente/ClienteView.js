Ext.define("TCSRV.view.cliente.ClienteView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "cliente-grid",
  title: "Clientes",
  store: "cliente.ClienteStore",
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Nombre",
      dataIndex: "nombre",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Correo Electrónico",
      dataIndex: "email",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Número Fiscal",
      dataIndex: "cifnif",
      flex: 1,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Teléfono",
      dataIndex: "telefono1",
      flex: 1,
      editor: {
        xtype: "textfield",
        //allowBlank: false,
      },
    },
    {
      text: "Centro Autorizado",
      dataIndex: "nombre_centroautorizado",
      flex: 1,
      editor: {
        xtype: "centroautorizado_combobox",
        allowBlank: false,
        fieldLabel: "",
        valueField:'nombre',
        listeners:{
          change: (cmp,nv,ov,e)=>{
            let grid_clientes = cmp.up('grid');
            let selected_record = grid_clientes.getSelectionModel().getSelection()[0];
            let id_record_combo = cmp.getSelection().get('id');

            selected_record.set('id_centroautorizado',id_record_combo);
           // selected_record.commit();

          }
        }
        //displayField: "nombre_centroautorizado",
       // valueField: "id_centroautorizado",
       // store:'centroautorizado.addons.CentroAutorizadoComboStore'
      },
    },
    {
      text: "Observaciones",
      dataIndex: "observaciones",
      flex: 1,
      editor: {
        xtype: "textfield",
      },
    },
  ],
});
