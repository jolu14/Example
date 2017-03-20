<?php

//======================================================================================================================
include '0-CompanyDB.php';

//======================================================================================================================
//                                                          //Con el objetivo de mantener modularidad se van a agregar
//                                                          //    todos los metodos dentro de una clase con un nombre
//                                                          //    representativo
class CompanyLogin
{
   //-------------------------------------------------------------------------------------------------------------------
   //                                                       //Funcion principal que va diagnosticar el resultado del
   //                                                       //    login, se decidio dividir el problema en submetodos
   public static function enumCheckUserAndPassword($strUser_I, $strPassword_I)
   {
         //                                                    //Se crea la conexion a la base de datos
         $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
            CompanyDB::$DB_DATABASE);

         //                                                    //Se ejecuta el query deseado que esta almacendado en la
         //                                                    //    base de datos con stored procedures, que en este
         //                                                    //    caso solo es checara al usuario
         $result = mysqli_query($connection, "CALL stpCheckUser('$strUser_I')");

         //                                                    //El resultado de reglones existe y es igual 1
         $count = mysqli_num_rows($result);
         if($count == 1)
         {
            //                                                 //Verifica contrasena
            return CompanyLogin::enumCorrectPassword($strUser_I, $strPassword_I, $connection);
         }
         else
         {
            return ConnectionEnum::USER_NOT_EXIST;
         }
   }

   //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   public static function enumCorrectPassword($strUser_I, $strPassword_I)
   {
         //                                                    //Se crea la conexion a la base de datos
         $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
               CompanyDB::$DB_DATABASE);

         //                                                    //Se ejecuta el query deseado que esta almacendado en la
         //                                                    //    base de datos con stored procedures
         $result = mysqli_query($connection, "CALL stpCheckUserPassword('$strUser_I','$strPassword_I')");

         $count = mysqli_num_rows($result);

         if($count == 1)
         {
            return ConnectionEnum::SUCCESFULL_LOGGIN;
         }
         else
         {
            return ConnectionEnum::INCORRECT_PASSWORD;
         }
   }

   //-------------------------------------------------------------------------------------------------------------------
}

//======================================================================================================================
?>
