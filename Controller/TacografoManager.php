<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Controller;

use FacturaScripts\Core\Template\ApiController;

use FacturaScripts\Plugins\Tacoluservicios\Model\CentroAutorizado;
use FacturaScripts\Plugins\Tacoluservicios\Model\Vehiculo;

use FacturaScripts\Plugins\Tacoluservicios\Model\ModeloVehiculo;
use FacturaScripts\Plugins\Tacoluservicios\Model\MarcaVehiculo;

use FacturaScripts\Plugins\Tacoluservicios\Model\Tacografo;
use FacturaScripts\Plugins\Tacoluservicios\Model\ModeloTacografo;
use FacturaScripts\Plugins\Tacoluservicios\Model\CategoriaTacografo;

use FacturaScripts\Core\Model\Cliente;
use DateTime;
use Date;



/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class TacografoManager extends ApiController
{

     /*
        fields:
        
        id
        no_serie
        id_vehiculo
        id_modelo
        id_categoria
        escala_velocidad
        fecha_fabricacion
        fecha_fin_garantia
        fecha_instalacion
        fecha_ultima_revision
        homologacion
        comentario     
      */

    /**
     *
     */
    private function Tacografo_getAllBuilded()
    {

        $result = [];
        $t = new Tacografo();

        $all = $t->all();
        foreach ($all as $t) {
            $data = $this->buildModel_Dependencies($t, true);
            array_push($result, $data);
        }

        return $result;
    }

   /**
    * Funcion encargada de crear un resultado conjuntamente con las dependencias
    * de este objeto, similar al JOIN
    *
    * @param object $tacografo objeto para resolver las dependencias
    * @param bool $ResultasObject Si deseamos obtener un objeto o no (default=false)
    * @return array | object
    *
    * @author Aquiles Perez Miranda
    */
    private function buildModel_Dependencies($tacografo, $ResultasObject = false)
    {


        $c = new Cliente();
        $modelo_tacografo = new ModeloTacografo();
        $categoria_tacografo = new CategoriaTacografo();
        $vehiculo = new Vehiculo();

        $a = (array) $tacografo;

        //modelo del tacografo
        $a['nombre_modelo'] = $modelo_tacografo->get($tacografo->idmodelo)->nombre;

        //marca del tacografo
        $a['nombre_marca'] = $categoria_tacografo->get($modelo_tacografo->get($tacografo->idmodelo)->id)->nombre;

        //vehiculo
        $a['matricula'] = $vehiculo->get($tacografo->idvehiculo)->matricula;
        $a['no_chasis'] = $vehiculo->get($tacografo->idvehiculo)->no_chasis;


        return $ResultasObject ? (object) $a : $a;
    }

    private function searchData($vehiculos, $query)
    {

        $result = [];

        #$ca = new Vehiculo();
        $data = $this->Tacografo_getAllBuilded();


        foreach ($data as $d) {

            //no_serie
            if (str_contains(strtolower($d->matricula), strtolower($query))) {
                array_push($result, $d);
            }

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

        $tacografos = new Tacografo();

        //----------------------------------------------- Method Get: Read and Search ------------------------------------------------
        if ($this->request->isMethod('GET')) {

            //------------------------------------------------------------- Read ---------------------------------------------------
            if ($_GET['action'] == 'read') {


                $query = isset($_GET['query']) ? $_GET['query'] : null;

                //-------------------------------------------------- Reading from grid -------------------------------------------------
                if (!$query || $query == 'all') {

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];


                    $result = $this->Tacografo_getAllBuilded();

                    $data = ["tacografos" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($data));
                }
                //---------------------------------------- Reading and Search from combobox ---------------------------------------
                else {

                    $query = $_GET['query'];

                    #$ca = new Vehiculo();
                    #$data = $ca->all();

                    $data = $this->Tacografo_getAllBuilded();

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

                    $data = $this->Tacografo_getAllBuilded();

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


                    $matricula = $_POST['matricula'];
                    $no_chasis = $_POST['no_chasis'];
                    $fecha_matricula = (new DateTime($_POST['fecha_matricula']))->format('m-d-Y');
                    $cliente  = ($_POST['codcliente'] != '') ? $_POST['codcliente'] : null;
                    $modelo = $_POST['modelo'];
                    $comentarios = $_POST['comentarios'];

                    $tacografos = new Vehiculo();

                    $tacografos->matricula = $matricula;
                    $tacografos->no_chasis = $no_chasis;
                    $tacografos->fecha_matricula = $fecha_matricula;
                    $tacografos->codcliente = $cliente;
                    $tacografos->idmodelo = $modelo;
                    $tacografos->comentario = $comentarios;

                    $tacografos->save();

                    $resp_data = ["success" => 'true', "action" => 'create'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
                //--------------------------------------------------- Update -------------------------------------------------------
                else if ($_POST['action'] == 'update') {

                    $record = json_decode($_POST['record_updated']);
                    
                    $tacografos = new Vehiculo();
                    $tacografos = $tacografos->get($record->id);

                    $tacografos->matricula = $record->matricula;
                    $tacografos->no_chasis = $record->no_chasis;
                    $tacografos->fecha_matricula = (new DateTime($record->fecha_matricula))->format('d-m-Y');
                    $tacografos->codcliente = $record->codcliente;
                    $tacografos->idmodelo = $record->idmodelo;
                    $tacografos->comentario = $record->comentario;

                    $r = $tacografos->save();

                    if ($r) {
                        $resp_data = ["success" => $r, "action" => 'update'];
                        $this->response->setStatusCode(200);
                        $this->response->setContent(json_encode($resp_data));
                    } else {
                        $resp_data = ["success" => $r, "action" => 'update'];
                        $this->response->setStatusCode(400);
                        $this->response->setContent(json_encode($resp_data));
                    }
                }
                //----------------------------------------------------- Delete ------------------------------------------------

                else if ($_POST['action'] == 'delete') {

                    $tacografos = new Vehiculo();
                    $record_ids = json_decode($_POST['records_ids_delete']);

                    foreach ($record_ids as $id) {
                        $tacografos = $tacografos->get($id);
                        $tacografos->delete();
                    }

                    $resp_data = ["success" => 'true', "action" => 'delete'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
            }
    }
}
