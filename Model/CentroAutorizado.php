<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class CentroAutorizado extends ModelClass
{
    use ModelTrait;

    /** @var string */
    public $codigo;

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
        return "tbl_centroautorizado";
    }

    public function test(): bool
    {
        $this->codigo = Tools::noHtml($this->codigo);
        $this->nombre = Tools::noHtml($this->nombre);
        return parent::test();
    }}
