<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Controller;

use FacturaScripts\Core\Base\Controller;

/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class TacoluserviciosManager extends Controller
{
    public function getPageData(): array
    {
        $pageData = parent::getPageData();
        $pageData["menu"] = "TACOLUSERVICIOS";
        $pageData["title"] = "Administración";
        $pageData["icon"] = "fas fa-file";
        return $pageData;
    }

    /**
     * Ejecuta la lógica privada del controlador.
     */
    public function privateCore(&$response, $user, $permissions): void
    {
        parent::privateCore($response, $user, $permissions);

        $this->setTemplate('TacoluserviciosView');
        // tu código aquí
    }

    /**
     * Ejecuta la lógica pública del controlador.
     */
    public function publicCore(&$response): void
    {
        parent::publicCore($response);

        // tu código aquí
    }
}
