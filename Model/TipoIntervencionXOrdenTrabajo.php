<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class TipoIntervencionXOrdenTrabajo extends ModelClass
{
    use ModelTrait;

    /** @var int */
    public $id;

    /** @var int */
    public $id_orden_trabajo;

    /** @var int */
    public $id_tipointervencion;

    public function clear() 
    {
        parent::clear();
        $this->id_orden_trabajo = 0;
        $this->id_tipointervencion = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "tbl_rel_tipointervencion_x_orden_trabajo";
    }

    public function test(): bool
    {
        return parent::test();
    }}
