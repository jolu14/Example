<?php

//======================================================================================================================
include '0-CompanyDB.php';

//                                                          //Variables globales obtenidas del formulario para login
$action = $_POST["action"];
$strUser_I = $_POST["strUserName_I"];
$strPassword_I = $_POST["strPassword_I"];

//======================================================================================================================
//                                                          //Selecciona el metodo a ejecutar, se coloca solo por
//                                                          //    estandar
switch ($action){
    case "echoLogin": CompanyLogin::echoLogin($strUser_I, $strPassword_I);
          break;
}

//======================================================================================================================
//                                                          //Con el objetivo de mantener modularidad se van a agregar
//                                                          //    todos los metodos dentro de una clase con un nombre
//                                                          //    representativo
class CompanyLogin
{
   //-------------------------------------------------------------------------------------------------------------------
   //                                                       //Funcion principal que va diagnosticar el resultado del
   //                                                       //    login, se decidio dividir el problema en submetodos
   public static function echoLogin($strUser_I, $strPassword_I)
   {
      //                                                    //Revisa que la informacion del imput sea posible
      if (strlen($strUser_I) == 0 && strlen($strPassword_I) == 0)
      {
        echo CompanyDB::strAlert("Ingresa usuario y contraseña!");
      }
      else if (strlen($strUser_I) == 0 )
      {
        echo CompanyDB::strAlert("Ingresa usuario!");
      }
      else if (strlen($strPassword_I) == 0)
      {
        echo CompanyDB::strAlert("Ingresa contraseña!");
      }
      else
      {
         //                                                    //Verifica el usuario y la contraseña
         $enumConnection = CompanyLogin::enumCheckUserAndPassword($strUser_I, $strPassword_I);

         if ($enumConnection == ConnectionEnum::USER_NOT_EXIST)
         {
            echo CompanyDB::strAlert("El usuario no esta registrado!");
         }
         else if ($enumConnection == ConnectionEnum::INCORRECT_PASSWORD)
         {
            echo CompanyDB::strAlert("La contraseña es incorrecta!");
         }
         else if ($enumConnection == ConnectionEnum::SUCCESFULL_LOGGIN)
         {
            //                                                 //Si se inicia la sesion con exito se establece la infor-
            //                                                 //    macion de la sesion para el navigador
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $strUser_I;
            $_SESSION['start'] = time();
            $_SESSION['expire'] = $_SESSION['start'] + (5 * 60);
            echo true;
         }
         else
         {
            echo CompanyDB::strAlert("Error desconocido en subLoggin(---, ---)");
         }
      }
   }

   //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
