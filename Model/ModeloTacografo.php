<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class ModeloTacografo extends ModelClass
{
    use ModelTrait;

    /** @var int */
    public $id;

    /** @var string */
    public $nombre;

    /** @var int */
    public $tipo;

    public function clear() 
    {
        parent::clear();
        $this->tipo = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "tbl_modelo_tacografo";
    }

    public function test(): bool
    {
        $this->nombre = Tools::noHtml($this->nombre);
        return parent::test();
    }}
