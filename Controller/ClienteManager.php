<?php

namespace FacturaScripts\Plugins\Tacoluservicios\Controller;

use FacturaScripts\Core\Template\ApiController;

use FacturaScripts\Plugins\Tacoluservicios\Model\CentroAutorizado;
use FacturaScripts\Plugins\Tacoluservicios\Model\CustomCliente;

/**
 * Un controlador es básicamente una página o una opción del menú de FacturaScripts.
 *
 * https://facturascripts.com/publicaciones/los-controladores-410
 */
class ClienteManager extends ApiController
{

    /**
     * Summary of updateData
     *  Esta funcion hace un join con el modelo Centro Autorizado, puesto que hay una relacion de 1 a muchos 
     *  un centro de autorizos tiene muchos clientes
     * 
     * @param object $clienteModel El modelo de Clientes en FacturaScripts
     * @param object $centroautorizado El modelo de CentroAutorizado en FacturaScripts
     * @param bool $return_object Un variable booleana para retornar un arreglo de arreglos o un arreglo de objetos (tipo cliente) 
     * @return array Un arreglo de Clientes con la relacion de Centro Autorizado
     */
    private function updateData($clienteModel, $centroautorizadoModel, $return_object = false)
    {

        $clientes = $clienteModel->all();

        $result = [];

        foreach ($clientes as $cliente) {
            $cliente = (array) $cliente;
            if ($cliente['id_centroautorizado'])
                $cliente['nombre_centroautorizado'] = $centroautorizadoModel->get($cliente['id_centroautorizado'])->nombre;
            else $cliente['nombre_centroautorizado'] = Null;
            array_push($result, (!$return_object) ? $cliente : (object) $cliente);
        }

        return $result;
    }


    /**
     * Busca los clientes por codigo cifnif, nombre, email, telefono y centro de autorizo
     * 
     * @param array $clientes un arreglo de objetos que representa a los clientes
     * @param string $query una cadena obtenida del clientes que representa una consulta a buscar
     * @return array un arreglo de los objetos que coinciden con los campos de la busqueda
     */
    private function searchData($clientes, $query)
    {

        $result = [];

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
            } else continue;
        }

        return $result;
    }

    protected function runResource(): void
    {

        $centroautorizado_model = new CentroAutorizado();
        $cliente_model = new CustomCliente();

        //----------------------------------------------- Method Get: Read and Search ------------------------------------------------
        if ($this->request->isMethod('GET')) {


            //------------------------------------------------------------- Read ---------------------------------------------------
            if ($_GET['action'] == 'read') {

                $query = isset($_GET['query']) ? $_GET['query'] : null;

                //-------------------------------------------------- Reading from grid -------------------------------------------------
                if (!$query || $query == 'all') {

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $clientes_updated = $this->updateData($cliente_model, $centroautorizado_model);

                    $data = ["clientes" => array_slice($clientes_updated, $start, $limit), "total" => count($clientes_updated)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($data));
                }

                //---------------------------------------- Reading and Search from combobox ---------------------------------------
                else {

                    $query = $_GET['query'];

                    $clientes_updated = $this->updateData($cliente_model, $centroautorizado_model, true);

                    $result = $this->searchData($clientes_updated, $query);

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $resp_data = ["clientes" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
            } else
                //----------------------------------------------- Action Search ------------------------------------------------------
                //cuando buscamos desde el grid  
                if ($_GET['action'] == 'search') {

                    $query = $_GET['query'];

                    // $result = [];

                    $clientes_updated = $this->updateData($cliente_model, $centroautorizado_model, true);

                    $result = $this->searchData($clientes_updated, $query);

                    $start = $_GET['start'];
                    $limit = $_GET['limit'];

                    $resp_data = ["clientes" => array_slice($result, $start, $limit), "total" => count($result)];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                }
        } else
            // ------------------------------------- Method: Post -> Create, Update, Delete -------------------------------------------------

            if ($this->request->isMethod('POST')) {

                // ------------------------------------------------- Create -------------------------------------------------------------
                if ($_POST['action'] == 'create') {

                    $cifnif = $_POST['cifnif'];
                    $nombre = $_POST['nombre'];
                    $email = $_POST['email'];
                    $telefono1 = $_POST['telefono1'];
                    $id_centroautorizado = $_POST['centroautorizado'];
                    $observaciones = $_POST['observaciones'];

                    $new_cliente = new CustomCliente();
                    
                    $new_cliente->cifnif = $cifnif;
                    $new_cliente->nombre = $nombre;
                    $new_cliente->email = $email;
                    $new_cliente->telefono1 = $telefono1;
                    $new_cliente->observaciones = $observaciones;

                    $new_cliente->id_centroautorizado = $id_centroautorizado;

                    $new_cliente->save();

                    $resp_data = ["success" => 'true', "action" => 'create'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));

                    //--------------------------------------------------- Update -------------------------------------------------------
                } else if ($_POST['action'] == 'update') {

                   /* $record = json_decode($_POST['record_updated']);

                    $centroautorizado = new CentroAutorizado();
                    $centroautorizado = $centroautorizado->get($record->id);
                    $centroautorizado->codigo = $record->codigo;
                    $centroautorizado->nombre = $record->nombre;

                    $centroautorizado->save();*/

                    $resp_data = ["success" => 'true', "action" => 'update'];
                    $this->response->setStatusCode(200);
                    $this->response->setContent(json_encode($resp_data));
                } else
                    //----------------------------------------------------- Delete ------------------------------------------------

                    if ($_POST['action'] == 'delete') {

                        /*$centroautorizado = new CentroAutorizado();
                        $record_ids = json_decode($_POST['records_ids_delete']);

                        foreach ($record_ids as $id) {
                            $centroautorizado = $centroautorizado->get($id);
                            $centroautorizado->delete();
                        }*/

                        $resp_data = ["success" => 'true', "action" => 'delete'];
                        $this->response->setStatusCode(200);
                        $this->response->setContent(json_encode($resp_data));
                    }
            }
    }
}
