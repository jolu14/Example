<?php
include '../Model/1-LoginDB.php';

//======================================================================================================================
//                                                          //Variables globales obtenidas del formulario para login
$action = $_POST["action"];

//======================================================================================================================
//                                                          //Selecciona el metodo a ejecutar, se coloca solo por
//                                                          //    estandar
switch ($action){
    case "echoLogin": LoginController::echoLogin();
          break;
    case "echoLogout": LoginController::echoLogout();
          break;
}

//======================================================================================================================
class LoginController
{
    //------------------------------------------------------------------------------------------------------------------
    public static function echoLogin()
    {
        $strUser_I = $_POST["strUserName_I"];
        $strPassword_I = $_POST["strPassword_I"];

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

    //------------------------------------------------------------------------------------------------------------------
    public static function echoLogout()
    {
        session_destroy();
    }

    //------------------------------------------------------------------------------------------------------------------
}

//======================================================================================================================
?>
