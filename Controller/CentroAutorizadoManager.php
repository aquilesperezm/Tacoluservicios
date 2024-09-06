<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Controller;

use FacturaScripts\Core\Template\ApiController;

use FacturaScripts\Plugins\Tacoluservicios\Model\CentroAutorizado;

/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class CentroAutorizadoManager extends ApiController
{
    protected function runResource(): void
    {
        //read and search
        if ($this->request->isMethod('GET')) {

            //read
            if ($_GET['action'] == 'read') {

                $start = $_GET['start'];
                $limit = $_GET['limit'];

                $d = new CentroAutorizado();
                $result = $d->all();

                $data = ["centrosautorizados" => array_slice($result, $start, $limit), "total" => count($result)];
                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($data));
            }
            if ($_GET['action'] == 'search') {

                $query = $_GET['query'];

                $result = [];

                $ca = new CentroAutorizado();
                $data = $ca->all();

                foreach ($data as $d) {

                    //codigo
                    if (str_contains(strtolower($d->codigo), strtolower($query))) {
                        array_push($result, $d);
                    } 
                    //nombre
                    else if (str_contains(strtolower($d->nombre), strtolower($query))) {
                        array_push($result, $d);
                    } else continue;
                }

                $start = $_GET['start'];
                $limit = $_GET['limit'];

                $resp_data = ["centrosautorizados" => array_slice($result, $start, $limit), "total" => count($result)];
                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($resp_data));
            }
        }
    }
}
