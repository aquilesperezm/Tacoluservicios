<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class Vehiculo extends ModelClass
{
    use ModelTrait;

    /** @var string */
    public $comentario;

    /** @var string */
    public $fecha_matricula;

    /** @var int */
    public $id;

    /** @var int */
    public $codcliente;

    /** @var int */
    public $idmodelo;

    /** @var string */
    public $matricula;

    /** @var string */
    public $no_chasis;

    public function clear() 
    {
        parent::clear();
        $this->fecha_matricula = date(self::DATE_STYLE);
        //$this->idcliente = 0;
        $this->idmodelo = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "tbl_vehiculo";
    }

    public function test(): bool
    {
        $this->comentario = Tools::noHtml($this->comentario);
        $this->matricula = Tools::noHtml($this->matricula);
        $this->no_chasis = Tools::noHtml($this->no_chasis);
        return parent::test();
    }}
