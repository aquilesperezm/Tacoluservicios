Ext.define("TCSRV.view.modelovehiculo.ModeloVehiculoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "modelovehiculo-grid",
  title: "Modelos de Vehículos",
  store: 'modelovehiculo.ModeloVehiculoStore',
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Modelo",
      dataIndex: "nombre",
      flex: 5,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Marca",
      dataIndex: "nombre_marca",
      flex: 5,
      editor: {
        xtype: "marcavehiculo_combobox",
        fieldLabel:'',
        allowBlank: false, 
        valueField:'nombre',
        listeners:{
          change: (cmp,nv,ov,e)=>{
            let grid_clientes = cmp.up('grid');
            let selected_record = grid_clientes.getSelectionModel().getSelection()[0];
            let id_record_combo = cmp.getSelection().get('id');

            selected_record.set('idmarca',id_record_combo);
           // selected_record.commit();

          }
        }
      },
    }
  ],
});
