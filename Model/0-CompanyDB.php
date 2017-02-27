<?php
session_start();

//======================================================================================================================
//                                                          //Informacion y metodos basica de la base de datos
class CompanyDB
{
    public static $DB_SERVER = 'localhost';
    public static $DB_USERNAME = 'root';
    public static $DB_PASSWORD = '';
    public static $DB_DATABASE = 'Company';

    //                                                      //Metodo que regresa una alerta con el formato deseado,
    //                                                      //    este metodo sera utilizado por todo el sitema al
    //                                                      //    querer reportar algo.
    public function strAlert($strMessage_I)
    {
      return "<div> <strong>Alerta!</strong></br> $strMessage_I </div>";
    }

    //                                                      //Metodo que regresa una alerta con el formato deseado,
    //                                                      //    este metodo sera utilizado por todo el sitema al
    //                                                      //    querer reportar algo.
    public function strSucces($strMessage_I)
    {
      return "<div> <strong>Success!</strong></br> $strMessage_I </div>";
    }
}

//======================================================================================================================
//                                                          //Enumerador para regresar la informacion en un solo formato
class ConnectionEnum
{
    const Z_ERROR_NOT_DEFINE = "Z_ERROR_NOT_DEFINE";
    const USER_EXIST = "USER_EXIST";
    const USER_NOT_EXIST = "USER_NOT_EXIST";
    const SUCCESFULL_LOGGIN = "SUCCESFULL_LOGGIN";
    const INCORRECT_PASSWORD = "INCORRECT_PASSWORD";
    const CORRECT_PASSWORD = "CORRECT_PASSWORD";
}

//======================================================================================================================
?>
