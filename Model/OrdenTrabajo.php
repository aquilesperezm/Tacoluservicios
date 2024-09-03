<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class OrdenTrabajo extends ModelClass
{
    use ModelTrait;

    /** @var string */
    public $fecha_orden;

    /** @var int */
    public $id;

    /** @var int */
    public $id_vehiculo;

    /** @var int */
    public $idtacografo;

    /** @var string */
    public $no_orden;

    public function clear() 
    {
        parent::clear();
        $this->fecha_orden = date(self::DATE_STYLE);
        $this->id_vehiculo = 0;
        $this->idtacografo = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "tbl_orden_trabajo";
    }

    public function test(): bool
    {
        $this->no_orden = Tools::noHtml($this->no_orden);
        return parent::test();
    }}
