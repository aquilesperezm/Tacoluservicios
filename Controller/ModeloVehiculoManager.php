<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Controller;

use FacturaScripts\Core\Template\ApiController;

use FacturaScripts\Plugins\Tacoluservicios\Model\ModeloVehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\MarcaVehiculo;

/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class ModeloVehiculoManager extends ApiController
{

    private function updateData($modeloVehiculo, $marcaVehiculo, $return_object = false)
    {

        $modelos = $modeloVehiculo->all();

        $result = [];

        foreach ($modelos as $modelo) {
            $modelo = (array) $modelo;
            if ($modelo['idmarca'])
                $modelo['nombre_marca'] = $marcaVehiculo->get($modelo['idmarca'])->nombre;
            else $modelo['nombre_marca'] = Null;
            array_push($result, (!$return_object) ? $modelo : (object) $modelo);
        }

        return $result;
    }


    private function searchData($centros, $query)
    {

        $result = [];

        $cliente_model = new ModeloVehiculo();
        $marca_model = new MarcaVehiculo();

        $data = $this->updateData($cliente_model, $marca_model, true);

        foreach ($data as $d) {

            //marca
            if (str_contains(strtolower($d->nombre_marca), strtolower($query))) {
                array_push($result, $d);
            }
            //modelo
            else if (str_contains(strtolower($d->nombre), strtolower($query))) {
                array_push($result, $d);
            } else continue;
        }

        return $result;
    }


    protected function runResource(): void
    {

        $cliente_model = new ModeloVehiculo();
        $marca_model = new MarcaVehiculo();

        //----------------------------------------------- Method Get: Read and Search ------------------------------------------------
        if ($this->request->isMethod('GET')) {

            //------------------------------------------------------------- Read ---------------------------------------------------
            if ($_GET['action'] == 'read') {


                $query = isset($_GET['query']) ? $_GET['query'] : null;

                //-------------------------------------------------- Reading from grid -------------------------------------------------
                if (!$query || $query == 'all') {

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $modelos_vehiculos_updated = $this->updateData($cliente_model, $marca_model);

                    $data = ["modelosvehiculos" => array_slice($modelos_vehiculos_updated, $start, $limit), "total" => count($modelos_vehiculos_updated)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($data));
                }
                //---------------------------------------- Reading and Search from combobox ---------------------------------------
                else {

                    $query = $_GET['query'];

                    $ti = new ModeloVehiculo();
                    $data = $ti->all();

                    $result = $this->searchData($data, $query);

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $resp_data = ["modelosvehiculos" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
            } else
                //----------------------------------------------- Action Search ------------------------------------------------------
                //cuando buscamos desde el grid  
                if ($_GET['action'] == 'search') {

                    $query = $_GET['query'];

                    $ti = new ModeloVehiculo();
                    $data = $ti->all();

                    $result = $this->searchData($data, $query);

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $resp_data = ["modelosvehiculos" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
        } else
            // ------------------------------------- Method: Post -> Create, Update, Delete -------------------------------------------------
            if ($this->request->isMethod('POST')) {

                // ------------------------------------------------- Create -------------------------------------------------------------
                if ($_POST['action'] == 'create') {

                    $idmarca = $_POST['idmarca'];
                    $nombre = $_POST['nombre'];

                    $d = new ModeloVehiculo();

                    $d->idmarca = $idmarca;
                    $d->nombre = $nombre;

                    $d->save();

                    $resp_data = ["success" => 'true', "action" => 'create'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
                //--------------------------------------------------- Update -------------------------------------------------------
                else if ($_POST['action'] == 'update') {

                    $record = json_decode($_POST['record_updated']);

                    $d = new ModeloVehiculo();
                    $d = $d->get($record->id);

                    $d->idmarca = $record->idmarca;
                    $d->nombre = $record->nombre;

                    $d->save();

                    $resp_data = ["success" => 'true', "action" => 'update'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
                //----------------------------------------------------- Delete ------------------------------------------------

                else if ($_POST['action'] == 'delete') {

                    $d = new ModeloVehiculo();
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
