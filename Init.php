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

/**
 * Los plugins pueden contener un archivo Init.php en el que se definen procesos a ejecutar
 * cada vez que carga FacturaScripts o cuando se instala o actualiza el plugin.
 *
 * https://facturascripts.com/publicaciones/el-archivo-init-php-307
 */
class Init extends InitClass
{
    public function init(): void
    {
        // se ejecuta cada vez que carga FacturaScripts (si este plugin está activado).

        //verificar si tiene la estructura creada
        $db = new DataBase();

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

        $result = $db->getColumns('clientes');
        $foreing_keys = $db->getConstraints('clientes');

        $exist_column_idcentroautorizado = array_key_exists('id_centroautorizado', $result);

        $exist_fk_clientes_centroautorizado = false;
        foreach ($foreing_keys as $key) {
            if ($key['name'] == 'clientes_fk1') {
                $exist_fk_clientes_centroautorizado = true;
                break;
            }
        }

        if ($db->tableExists('tbl_centroautorizado')) {
            if (!$exist_column_idcentroautorizado) {
                $db->exec('ALTER TABLE clientes ADD COLUMN id_centroautorizado INTEGER AFTER web; ');
                if (!$exist_fk_clientes_centroautorizado)
                    $db->exec('ALTER TABLE clientes ADD CONSTRAINT `clientes_fk1` FOREIGN KEY (`id_centroautorizado`) REFERENCES `tbl_centroautorizado` (`id`) ON DELETE SET NULL ON UPDATE CASCADE');
                //else Tools::log()->error('Ya existe la llave foranea clientes <-> centroautorizado');
            } else {
                if (!$exist_fk_clientes_centroautorizado)
                    $db->exec('ALTER TABLE clientes ADD CONSTRAINT `clientes_fk1` FOREIGN KEY (`id_centroautorizado`) REFERENCES `tbl_centroautorizado` (`id`) ON DELETE SET NULL ON UPDATE CASCADE');
                // else Tools::log()->error('Ya existe la llave foranea clientes <-> centroautorizado');
            }
        } /*else {
            $hero = new CentroAutorizado();
            //Tools::log()->error('No existe la tabla tbl_centroautorizado');
        }*/


        $fecha = date('Y-m-d');

        $verify_api_exists = $db->select("SELECT nick FROM api_keys WHERE nick='plugin_tacoluservicios'");
        $verify_api_isenabled = $db->select("SELECT properties FROM settings");

        $settings = json_decode($verify_api_isenabled[0]['properties']);
        //Enabling API Engine
        $settings->enable_api = true;
        $db->exec("UPDATE `settings` SET `properties` ='" . json_encode($settings) . "'");

        // Create APy Key Access
        if (count($verify_api_exists) == 0)
            $db->exec("INSERT INTO `api_keys`(`nick`,`apikey`,`creationdate`,`description`,`enabled`,`fullaccess`) 
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
    }

    public function uninstall(): void
    {
        // se ejecuta cada vez que se desinstale el plugin. Primero desinstala y luego ejecuta el uninstall.
    }

    public function update(): void
    {
        // se ejecuta cada vez que se instala o actualiza el plugin


    }
}
