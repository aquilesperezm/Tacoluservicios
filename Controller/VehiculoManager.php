<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Controller;

use FacturaScripts\Core\Template\ApiController;

use FacturaScripts\Plugins\Tacoluservicios\Model\CentroAutorizado;
use FacturaScripts\Plugins\Tacoluservicios\Model\Vehiculo;

use FacturaScripts\Plugins\Tacoluservicios\Model\ModeloVehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\MarcaVehiculo;

use FacturaScripts\Core\Model\Cliente;



/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class VehiculoManager extends ApiController
{


    private function Vehiculo_getAllBuilded(){
        
        $result = [];
        $v = new Vehiculo();

        $all = $v->all();
        foreach($all as $v){
           $data = $this->buildModel($v,true);
           array_push($result,$data);
        }

        return $result;

    }

    private function buildModel($v, $ResultasObject=false){

        $c = new Cliente();
        $m = new ModeloVehiculo();
        $ma = new MarcaVehiculo();

        $a = (array) $v;  
        
        //cliente
        $a['cifnif_cliente'] = $c->get($v->codcliente)->cifnif;
        $a['nombre_cliente'] = $c->get($v->codcliente)->nombre;

        //modelo
        $a['nombre_modelo'] = $m->get($v->idmodelo)->nombre;
        
        //marca
        $a['nombre_marca'] = $ma->get($m->get($v->idmodelo)->id)->nombre;

        return $ResultasObject ? (object) $a : $a;

        
    }

    private function searchData($vehiculos, $query)
    {

        $result = [];

        #$ca = new Vehiculo();
        $data = $this->Vehiculo_getAllBuilded();


        foreach ($data as $d) {

            //matricula
            if (str_contains(strtolower($d->matricula), strtolower($query))) {
                array_push($result, $d);
            }
            //numero de chasis
            else if (str_contains(strtolower($d->no_chasis), strtolower($query))) {
                array_push($result, $d);
            }
            //cifnif cliente
            else if (str_contains(strtolower($d->cifnif_cliente), strtolower($query))) {
                array_push($result, $d);
            }
            //marca
            else if (str_contains(strtolower($d->nombre_marca), strtolower($query))) {
                array_push($result, $d);
            } 
            //modelo
            else if (str_contains(strtolower($d->nombre_modelo), strtolower($query))) {
                array_push($result, $d);
            } else continue;
        }

        return $result;
    }


    protected function runResource(): void
    {

        $d = new Vehiculo();

        //----------------------------------------------- Method Get: Read and Search ------------------------------------------------
        if ($this->request->isMethod('GET')) {

            //------------------------------------------------------------- Read ---------------------------------------------------
            if ($_GET['action'] == 'read') {


                $query = isset($_GET['query']) ? $_GET['query'] : null;

                //-------------------------------------------------- Reading from grid -------------------------------------------------
                if (!$query || $query == 'all') {

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    #$result = $d->all();
                    $result = $this->Vehiculo_getAllBuilded();

                    $data = ["vehiculos" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($data));
                }
                //---------------------------------------- Reading and Search from combobox ---------------------------------------
                else {

                    $query = $_GET['query'];

                    #$ca = new Vehiculo();
                    #$data = $ca->all();
                    
                    $data = $this->Vehiculo_getAllBuilded();

                    $result = $this->searchData($data, $query);

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $resp_data = ["vehiculos" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
            } else
                //----------------------------------------------- Action Search ------------------------------------------------------
                //cuando buscamos desde el grid  
                if ($_GET['action'] == 'search') {

                    $query = $_GET['query'];

                    #$ca = new Vehiculo();
                    #$data = $ca->all();

                    $data = $this->Vehiculo_getAllBuilded();

                    $result = $this->searchData($data, $query);

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $resp_data = ["vehiculos" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
        } else
            // ------------------------------------- Method: Post -> Create, Update, Delete -------------------------------------------------
            if ($this->request->isMethod('POST')) {

                // ------------------------------------------------- Create -------------------------------------------------------------
                if ($_POST['action'] == 'create') {

                    $codigo = $_POST['matricula'];
                    $nombre = $_POST['nombre'];

                    $d = new CentroAutorizado();

                    $d->codigo = $codigo;
                    $d->nombre = $nombre;

                    $d->save();

                    $resp_data = ["success" => 'true', "action" => 'create'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
                //--------------------------------------------------- Update -------------------------------------------------------
                else if ($_POST['action'] == 'update') {

                   /* $record = json_decode($_POST['record_updated']);

                    $d = new CentroAutorizado();
                    $d = $d->get($record->id);
                    $d->codigo = $record->codigo;
                    $d->nombre = $record->nombre;

                    $d->save();*/

                    $resp_data = ["success" => 'true', "action" => 'update'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
                //----------------------------------------------------- Delete ------------------------------------------------

                else if ($_POST['action'] == 'delete') {

                  /*  $d = new CentroAutorizado();
                    $record_ids = json_decode($_POST['records_ids_delete']);

                    foreach ($record_ids as $id) {
                        $d = $d->get($id);
                        $d->delete();
                    }*/

                    $resp_data = ["success" => 'true', "action" => 'delete'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
            }
    }
}
