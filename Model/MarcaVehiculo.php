<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class MarcaVehiculo extends ModelClass
{
    use ModelTrait;

    /** @var int */
    public $id;

    /** @var string */
    public $nombre;

    public function clear() 
    {
        parent::clear();
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "tbl_marca_vehiculo";
    }

    public function test(): bool
    {
        $this->nombre = Tools::noHtml($this->nombre);
        return parent::test();
    }}
