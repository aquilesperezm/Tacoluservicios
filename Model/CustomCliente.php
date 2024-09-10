<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Model;

use FacturaScripts\Core\Model\Cliente;
use FacturaScripts\Core\Model\Base\ModelTrait;
use FacturaScripts\Core\Tools;
class CustomCliente extends Cliente
{
    use ModelTrait;

    /** @var int */
    public $id_centroautorizado;

    }
