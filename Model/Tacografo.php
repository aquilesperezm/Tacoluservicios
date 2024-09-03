<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Model;

use FacturaScripts\Core\Model\Base\ModelClass;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class Tacografo extends ModelClass
{
    use ModelTrait;

    /** @var string */
    public $comentario;

    /** @var int */
    public $escala_velocidad;

    /** @var string */
    public $fecha_fabricacion;

    /** @var string */
    public $fecha_fin_garantia;

    /** @var string */
    public $fecha_instalacion;

    /** @var string */
    public $fecha_ultima_revision;

    /** @var string */
    public $homologacion;

    /** @var int */
    public $id;

    /** @var int */
    public $idcategoria;

    /** @var int */
    public $idmodelo;

    /** @var string */
    public $no_serie;

    public function clear() 
    {
        parent::clear();
        $this->escala_velocidad = 0;
        $this->fecha_fabricacion = date(self::DATE_STYLE);
        $this->fecha_fin_garantia = date(self::DATE_STYLE);
        $this->fecha_instalacion = date(self::DATE_STYLE);
        $this->fecha_ultima_revision = date(self::DATE_STYLE);
        $this->idcategoria = 0;
        $this->idmodelo = 0;
    }

    public static function primaryColumn(): string
    {
        return "id";
    }

    public static function tableName(): string
    {
        return "tbl_tacografo";
    }

    public function test(): bool
    {
        $this->comentario = Tools::noHtml($this->comentario);
        $this->homologacion = Tools::noHtml($this->homologacion);
        $this->no_serie = Tools::noHtml($this->no_serie);
        return parent::test();
    }}
