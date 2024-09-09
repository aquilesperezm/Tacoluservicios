<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Controller;

use FacturaScripts\Core\Template\ApiController;

use FacturaScripts\Plugins\Tacoluservicios\Model\CentroAutorizado;
use FacturaScripts\Core\Model\Cliente;

/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class ClienteManager extends ApiController
{


    private function updateData($clientes, $centroautorizado, $return_object = false)
    {

        $result = [];

        foreach ($clientes as $cliente) {
            $cliente = (array) $cliente;
            $cliente['nombre_centroautorizado'] = $centroautorizado->get($cliente['id_centroautorizado'])->nombre;
            array_push($result, (!$return_object) ? $cliente : (object) $cliente);
        }

        return $result;
    }

    protected function runResource(): void
    {

        $centroautorizado = new CentroAutorizado();
        $cliente_db = new Cliente();

        //read and search
        if ($this->request->isMethod('GET')) {

            //read
            if ($_GET['action'] == 'read') {

                $start = $_GET['start'];
                $limit = $_GET['limit'];

                $clientes = $cliente_db->all();

                $result = $this->updateData($clientes, $centroautorizado);

                $data = ["clientes" => array_slice($result, $start, $limit), "total" => count($clientes)];
                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($data));
            }
            if ($_GET['action'] == 'search') {

                $query = $_GET['query'];

                $result = [];

                $cliente_db = new Cliente();
                $clientes = $cliente_db->all();

                $clientes = $this->updateData($clientes, $centroautorizado, true);

                foreach ($clientes as $cliente) {

                    //codigo
                    if (str_contains(strtolower($cliente->cifnif), strtolower($query))) {
                        array_push($result, $cliente);
                    }
                    //nombre
                    else if (str_contains(strtolower($cliente->nombre), strtolower($query))) {
                        array_push($result, $cliente);
                    } 
                    //email
                    else if (str_contains(strtolower($cliente->email), strtolower($query))) {
                        array_push($result, $cliente);
                    } 
                    //telefono 1
                    else if (str_contains(strtolower($cliente->telefono1), strtolower($query))) {
                        array_push($result, $cliente);
                    }
                    //centro autorizado
                    else if (str_contains(strtolower($cliente->nombre_centroautorizado), strtolower($query))) {
                        array_push($result, $cliente);
                    }
                    else continue;
                }

                $start = $_GET['start'];
                $limit = $_GET['limit'];

                $resp_data = ["clientes" => array_slice($result, $start, $limit), "total" => count($clientes)];
                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($resp_data));
            }
        } else if ($this->request->isMethod('POST')) {

            //create
            if ($_POST['action'] == 'create') {

                $codigo = $_POST['codigo'];
                $nombre = $_POST['nombre'];

                $centroautorizado = new CentroAutorizado();

                $centroautorizado->codigo = $codigo;
                $centroautorizado->nombre = $nombre;

                $centroautorizado->save();

                $resp_data = ["success" => 'true', "action" => 'create'];
                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($resp_data));

                //update
            } else if ($_POST['action'] == 'update') {

                $record = json_decode($_POST['record_updated']);

                $centroautorizado = new CentroAutorizado();
                $centroautorizado = $centroautorizado->get($record->id);
                $centroautorizado->codigo = $record->codigo;
                $centroautorizado->nombre = $record->nombre;

                $centroautorizado->save();

                $resp_data = ["success" => 'true', "action" => 'update'];
                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($resp_data));

                //delete 
            } else if ($_POST['action'] == 'delete') {

                $centroautorizado = new CentroAutorizado();
                $record_ids = json_decode($_POST['records_ids_delete']);

                foreach ($record_ids as $id) {
                    $centroautorizado = $centroautorizado->get($id);
                    $centroautorizado->delete();
                }

                $resp_data = ["success" => 'true', "action" => 'delete'];
                $this->response->setStatusCode(200);
                $this->response->setContent(json_encode($resp_data));
            }
        }
    }
}
