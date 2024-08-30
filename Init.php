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
        ){
            Tools::log()->error('<b>Error:</b> la base de datos no esta sincronizada para el plugin <b style="color:blue">TACOLUSERVICIOS</b>, por favor presione <b>Reconstruir</b>');
        }
        
        $db->exec('IF COL_LENGTH("clientes","id_centroautorizado") IS NULL BEGIN 
        
        END');

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
