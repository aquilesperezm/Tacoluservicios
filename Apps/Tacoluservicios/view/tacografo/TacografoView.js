Ext.define("TCSRV.view.tacografo.TacografoView", {
  extend: "TCSRV.view.base.BaseGridView",
  xtype: "tacografo-grid",
  title: "Tacógrafos",
  store: 'tacografo.TacografoStore',
  scrollable:true,
  columns: [
    {
      xtype: "rownumberer",
    },
    {
      text: "Número de Serie",
      dataIndex: "no_serie",
      width:150,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Modelo",
      dataIndex: "nombre_modelo",
      width:100,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Marca",
      dataIndex: "nombre_marca",
      width:550,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Matrícula (Vehículo)",
      dataIndex: "matricula",
      width:200,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Número de Chasis (Vehículo)",
      dataIndex: "no_chasis",
      width:250,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Escala de Velocidad",
      dataIndex: "escala_velocidad",
      width:150,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Fecha de Fabricación",
      dataIndex: "fecha_fabricacion",
      width:170,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Fecha Fin de Garantía",
      dataIndex: "fecha_fin_garantia",
      width:170,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Fecha de Instalación",
      dataIndex: "fecha_instalacion",
      width:170,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    },
    {
      text: "Fecha Última Revisión",
      dataIndex: "fecha_ultima_revision",
      width:170,
      editor: {
        xtype: "textfield",
        allowBlank: false,
      },
    }
  ],
});
