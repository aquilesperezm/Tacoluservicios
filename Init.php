<?php

namespace FacturaScripts\Plugins\Tacoluservicios;

use Exception;
use FacturaScripts\Core\Template\InitClass;
use FacturaScripts\Core\Base\DataBase;
use FacturaScripts\Core\KernelException;
use FacturaScripts\Core\Tools;
use FacturaScripts\Core\Plugins;


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
        //if (!$db->tableExists('tbl_modelo_vehiculo')) throw new KernelException('AccessDenied', 'test');

        if (

            !$db->tableExists('tbl_rel_tipointervencion_x_orden_trabajo')
            && !$db->tableExists('tbl_tipointervencion')
            //vehiculo
            && !$db->tableExists('tbl_marca_vehiculo')
            && !$db->tableExists('tbl_modelo_vehiculo')
            && !$db->tableExists('tbl_vehiculo')

            && !$db->tableExists('tbl_cliente')
            && !$db->tableExists('tbl_centroautorizado')
            //tacografo
            && !$db->tableExists('tbl_tacografo')
            && !$db->tableExists('tbl_categoria_tacografo')
            && !$db->tableExists('tbl_modelo_tacografo')
        ) {
            //  Tools::log()->error('<b>Error:</b> la base de datos no esta sincronizada para el plugin <b style="color:blue">TACOLUSERVICIOS</b>, por favor presione <b>Reconstruir</b>');
        }

        // echo($db->getTables()[0]->COL_LENGTH);
        // var_dump($result);
        // $exists = (mysql_num_rows($result))?TRUE:FALSE;


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


        //        var_dump($foreing_keys);

        if (!$exist_column_idcentroautorizado) {
            $db->exec('ALTER TABLE clientes ADD COLUMN id_centroautorizado INTEGER AFTER web; ');
            if ($db->tableExists('tbl_centroautorizado'))
                $db->exec('CONSTRAINT "clientes_fk1" FOREIGN KEY (`id_centroautorizado`) REFERENCES `tbl_centroautorizado` (`id`) ON DELETE SET NULL ON UPDATE CASCADE');
            else Tools::log()->error('No existe la tabla tbl_centroautorizado');
        } else {
            if ($db->tableExists('tbl_centroautorizado'))
                if (!$exist_fk_clientes_centroautorizado)
                    $db->exec('ALTER TABLE clientes ADD CONSTRAINT `clientes_fk1` FOREIGN KEY (`id_centroautorizado`) REFERENCES `tbl_centroautorizado` (`id`) ON DELETE SET NULL ON UPDATE CASCADE');
                else Tools::log()->error('Ya existe la llave foranea clientes <-> centroautorizado');
            else Tools::log()->error('No existe la tabla tbl_centroautorizado');
        }

        //var_dump($foreing_keys[7]);
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
