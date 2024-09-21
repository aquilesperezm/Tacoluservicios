<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Controller;

use FacturaScripts\Core\Template\ApiController;

use FacturaScripts\Plugins\Tacoluservicios\Model\CentroAutorizado;
use FacturaScripts\Plugins\Tacoluservicios\Model\TipoIntervencion;

/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class TipoIntervencionManager extends ApiController
{

    private function searchData($centros, $query)
    {

        $result = [];

        $ca = new TipoIntervencion();
        $data = $ca->all();

        foreach ($data as $d) {

            //codigo
           /* if (str_contains(strtolower($d->codigo), strtolower($query))) {
                array_push($result, $d);
            }*/
            //nombre
             if (str_contains(strtolower($d->nombre), strtolower($query))) {
                array_push($result, $d);
            } else continue;
        }

        return $result;
    }


    protected function runResource(): void
    {

        $d = new TipoIntervencion();

        //----------------------------------------------- Method Get: Read and Search ------------------------------------------------
        if ($this->request->isMethod('GET')) {

            //------------------------------------------------------------- Read ---------------------------------------------------
            if ($_GET['action'] == 'read') {


                $query = isset($_GET['query']) ? $_GET['query'] : null;

                //-------------------------------------------------- Reading from grid -------------------------------------------------
                if (!$query || $query == 'all') {

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $result = $d->all();

                    $data = ["tiposintervenciones" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($data));
                }
                //---------------------------------------- Reading and Search from combobox ---------------------------------------
                else {

                    $query = $_GET['query'];

                    $ti = new TipoIntervencion();
                    $data = $ti->all();

                    $result = $this->searchData($data, $query);

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $resp_data = ["tiposintervenciones" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
            } else
                //----------------------------------------------- Action Search ------------------------------------------------------
                //cuando buscamos desde el grid  
                if ($_GET['action'] == 'search') {

                    $query = $_GET['query'];

                    $ti = new TipoIntervencion();
                    $data = $ti->all();

                    $result = $this->searchData($data, $query);

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $resp_data = ["tiposintervenciones" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                } 
                
        } else
            // ------------------------------------- Method: Post -> Create, Update, Delete -------------------------------------------------
            if ($this->request->isMethod('POST')) {

                // ------------------------------------------------- Create -------------------------------------------------------------
                if ($_POST['action'] == 'create') {

                    //$codigo = $_POST['codigo'];
                    $nombre = $_POST['nombre'];

                    $d = new TipoIntervencion();

                    //$d->codigo = $codigo;
                    $d->nombre = $nombre;

                    $d->save();

                    $resp_data = ["success" => 'true', "action" => 'create'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
                //--------------------------------------------------- Update -------------------------------------------------------
                else if ($_POST['action'] == 'update') {

                    $record = json_decode($_POST['record_updated']);

                    $d = new TipoIntervencion();
                    $d = $d->get($record->id);
                    //$d->codigo = $record->codigo;
                    $d->nombre = $record->nombre;

                    $d->save();

                    $resp_data = ["success" => 'true', "action" => 'update'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));

                   
                }
                //----------------------------------------------------- Delete ------------------------------------------------

                else if ($_POST['action'] == 'delete') {

                    $d = new TipoIntervencion();
                    $record_ids = json_decode($_POST['records_ids_delete']);

                    foreach ($record_ids as $id) {
                        $d = $d->get($id);
                        $d->delete();
                    }

                    $resp_data = ["success" => 'true', "action" => 'delete'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
            }
    }
}
