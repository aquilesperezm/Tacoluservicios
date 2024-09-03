<?php

namespace FacturaScripts\Plugins\Tacoluservicios;

use Exception;
use FacturaScripts\Core\Template\InitClass;
use FacturaScripts\Core\Base\DataBase;
use FacturaScripts\Core\KernelException;
use FacturaScripts\Core\Tools;
use FacturaScripts\Core\Plugins;

use FacturaScripts\Plugins\Tacoluservicios\Model\CentroAutorizado;
use FacturaScripts\Plugins\Tacoluservicios\Model\ModeloTacografo;
use FacturaScripts\Plugins\Tacoluservicios\Model\ModeloVehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\MarcaVehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\Vehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\CategoriaTacografo;
use FacturaScripts\Plugins\Tacoluservicios\Model\Tacografo;

use FacturaScripts\Plugins\Tacoluservicios\Model\OrdenTrabajo;

use FacturaScripts\Plugins\Tacoluservicios\Model\TipoIntervencionXOrdenTrabajo;
use FacturaScripts\Plugins\Tacoluservicios\Model\TipoIntervencion;

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
        } else {
            $hero = new CentroAutorizado();
            Tools::log()->error('No existe la tabla tbl_centroautorizado');
        }
    
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
