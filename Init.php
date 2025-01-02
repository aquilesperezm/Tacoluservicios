<?php

namespace FacturaScripts\Plugins\Tacoluservicios;

use Exception;
use FacturaScripts\Core\Template\InitClass;
use FacturaScripts\Core\Base\DataBase;
use FacturaScripts\Core\KernelException;
use FacturaScripts\Core\Tools;
use FacturaScripts\Core\Plugins;


use FacturaScripts\Plugins\Tacoluservicios\Model\CentroAutorizado;
use FacturaScripts\Plugins\Tacoluservicios\Model\CustomCliente;


use FacturaScripts\Plugins\Tacoluservicios\Model\ModeloTacografo;
use FacturaScripts\Plugins\Tacoluservicios\Model\ModeloVehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\MarcaVehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\Vehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\CategoriaTacografo;
use FacturaScripts\Plugins\Tacoluservicios\Model\Tacografo;

use FacturaScripts\Plugins\Tacoluservicios\Model\OrdenTrabajo;


use FacturaScripts\Plugins\Tacoluservicios\Model\TipoIntervencionXOrdenTrabajo;
use FacturaScripts\Plugins\Tacoluservicios\Model\TipoIntervencion;

use FacturaScripts\Core\Controller\ApiRoot;
use FacturaScripts\Core\Kernel;

use FacturaScripts\Plugin;

/**
 * Los plugins pueden contener un archivo Init.php en el que se definen procesos a ejecutar
 * cada vez que carga FacturaScripts o cuando se instala o actualiza el plugin.
 *
 * https://facturascripts.com/publicaciones/el-archivo-init-php-307
 */
class Init extends InitClass
{
    private $db;

    function __construct()
    {
        $this->db = new DataBase();
    }

    public function init(): void
    {
        // se ejecuta cada vez que carga FacturaScripts (si este plugin está activado).

        //verificar si tiene la estructura creada


        $centro_autorizado = new CentroAutorizado();
        $custom_cliente = new CustomCliente();

        $tipointervencion = new TipoIntervencion();
        $categoria_tacografo = new CategoriaTacografo();
        $marca_vehiculo = new MarcaVehiculo();
        $modelo_tacografo = new ModeloTacografo();
        $modelo_vehiculo = new ModeloVehiculo();


        $tacografo = new Tacografo();
        $vehiculo = new Vehiculo();
        $orden = new OrdenTrabajo();
        $tipointervencion_x_ordentrabajo = new TipoIntervencionXOrdenTrabajo();

        var_dump(Plugins::list());

        if ( Plugins::isEnabled('Tacoluservicios') ) {
            // el plugin Proyectos está instalado y activado
        
            Tools::log()->info('Tacoluservicios Activo');

        } else Tools::log()->info('Tacoluservicios No Activo');

        //----------------------------------- Centro Autorizado ---------------------------------------------
        if (!$this->db->tableExists('tbl_centroautorizado')) {

            $this->db->exec("CREATE TABLE tbl_centroautorizado (codigo VARCHAR(50) COLLATE utf8mb4_unicode_520_ci 
            NOT NULL, id INTEGER(11) NOT NULL AUTO_INCREMENT, nombre VARCHAR(150) COLLATE utf8mb4_unicode_520_ci 
            NOT NULL,PRIMARY KEY USING BTREE (id)) ENGINE=InnoDB AUTO_INCREMENT=1 ROW_FORMAT=DYNAMIC CHARACTER 
            SET 'utf8mb4' COLLATE 'utf8mb4_unicode_520_ci'");


            if (!$this->exist_column_name('clientes', 'id_centroautorizado')) {
                $this->db->exec('ALTER TABLE clientes ADD COLUMN id_centroautorizado INTEGER AFTER web; ');
                if (!$this->exist_foreign_key('clientes', 'clientes_fk1'))
                    $this->db->exec('ALTER TABLE clientes ADD CONSTRAINT clientes_fk1 FOREIGN KEY (id_centroautorizado) REFERENCES tbl_centroautorizado (id) ON DELETE SET NULL ON UPDATE CASCADE');
            } else {
                if (!$this->exist_foreign_key('clientes', 'clientes_fk1'))
                    $this->db->exec('ALTER TABLE clientes ADD CONSTRAINT clientes_fk1 FOREIGN KEY (id_centroautorizado) REFERENCES tbl_centroautorizado (id) ON DELETE SET NULL ON UPDATE CASCADE');
            }

            Tools::log()->info('Tabla Centro Autorizado Creada');
            Tools::log()->info('Relacion Centro Autorizado -> Cliente Creada');
        } else {

            if (!$this->exist_column_name('clientes', 'id_centroautorizado')) {
                $this->db->exec('ALTER TABLE clientes ADD COLUMN id_centroautorizado INTEGER AFTER web; ');
                if (!$this->exist_foreign_key('clientes', 'clientes_fk1'))
                    $this->db->exec('ALTER TABLE clientes ADD CONSTRAINT clientes_fk1 FOREIGN KEY (id_centroautorizado) REFERENCES tbl_centroautorizado (id) ON DELETE SET NULL ON UPDATE CASCADE');
            } else {
                if (!$this->exist_foreign_key('clientes', 'clientes_fk1'))
                    $this->db->exec('ALTER TABLE clientes ADD CONSTRAINT clientes_fk1 FOREIGN KEY (id_centroautorizado) REFERENCES tbl_centroautorizado (id) ON DELETE SET NULL ON UPDATE CASCADE');
            }

            Tools::log()->info('Relación Centro Autorizado - Clientes Creada');
        }

        //-------------------------------------------------------------------------------------------------------- 

        //--------------------------------------------- 


        $fecha = date('Y-m-d');

        $verify_api_exists = $this->db->select("SELECT nick FROM api_keys WHERE nick='plugin_tacoluservicios'");
        $verify_api_isenabled = $this->db->select("SELECT properties FROM settings");

        $settings = json_decode($verify_api_isenabled[0]['properties']);
        //Enabling API Engine
        $settings->enable_api = true;
        $this->db->exec("UPDATE settings SET properties ='" . json_encode($settings) . "'");

        // Create APy Key Access
        if (count($verify_api_exists) == 0)
            $this->db->exec("INSERT INTO api_keys(nick,apikey,creationdate,description,enabled,fullaccess) 
            VALUES('plugin_tacoluservicios', 'Tacoluservicios2024**','$fecha','API para el plugin TacoluServicios', true, true)");


        //Register API 
        //Centro Autorizado
        Kernel::addRoute('/api/3/centroautorizado_manager', 'CentroAutorizadoManager', -1);
        ApiRoot::addCustomResource('centroautorizado_manager');

        //Cliente
        Kernel::addRoute('/api/3/cliente_manager', 'ClienteManager', -1);
        ApiRoot::addCustomResource('cliente_manager');

        //TipoIntervencion
        Kernel::addRoute('/api/3/tipointervencion_manager', 'TipoIntervencionManager', -1);
        ApiRoot::addCustomResource('tipointervencion_manager');

        //MarcaVehiculo
        Kernel::addRoute('/api/3/marcavehiculo_manager', 'MarcaVehiculoManager', -1);
        ApiRoot::addCustomResource('marcavehiculo_manager');

        //ModeloVehiculo
        Kernel::addRoute('/api/3/modelovehiculo_manager', 'ModeloVehiculoManager', -1);
        ApiRoot::addCustomResource('modelovehiculo_manager');

        //Vehiculo
        Kernel::addRoute('/api/3/vehiculo_manager', 'VehiculoManager', -1);
        ApiRoot::addCustomResource('vehiculo_manager');

        //Modelos de Tacografos
        Kernel::addRoute('/api/3/modelotacografo_manager', 'ModeloTacografoManager', -1);
        ApiRoot::addCustomResource('modelotacografo_manager');

        //Categorias de Tacografos
        Kernel::addRoute('/api/3/categoriatacografo_manager', 'CategoriaTacografoManager', -1);
        ApiRoot::addCustomResource('categoriatacografo_manager');

        //Tacografos
        Kernel::addRoute('/api/3/tacografo_manager', 'TacografoManager', -1);
        ApiRoot::addCustomResource('tacografo_manager');
    }

    public function uninstall(): void
    {
        // se ejecuta cada vez que se desinstale el plugin. Primero desinstala y luego ejecuta el uninstall.
        Tools::log()->info('Plugin Tacoluservicios Desinstalado');

        //------------------------------------ Centro autorizado -------------------------------------------

        if ($this->exist_column_name('clientes', 'id_centroautorizado')) {
            if ($this->exist_foreign_key('clientes', 'clientes_fk1')) {
                $this->db->exec('ALTER TABLE clientes DROP FOREIGN KEY clientes_fk1;');
                $this->db->exec('DROP TABLE tbl_centroautorizado;');

                Tools::log()->info('Tabla tbl_centroautorizado Eliminada');
            } else Tools::log()->info('Test 2 Failed');
        } else Tools::log()->info('Test 1 Failed');




        //--------------------------------------------------------------------------------------------------
    }

    private function exist_column_name($table_name, $column_name): bool
    {

        $result = $this->db->getColumns($table_name);
        //detect column with fk
        return array_key_exists($column_name, $result);
    }

    private function exist_foreign_key($table_name, $foreign_key_name): bool
    {


        $foreing_keys = $this->db->getConstraints($table_name);
        $exist_fk = false;
        foreach ($foreing_keys as $key) {
            if ($key['name'] == $foreign_key_name) {
                $exist_fk = true;
                break;
            }
        }

        return $exist_fk;
    }

    public function update(): void
    {
        // se ejecuta cada vez que se instala o actualiza el plugin


    }
}
