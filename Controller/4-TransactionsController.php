<?php
include '../Model/4-TransactionsDB.php';
//                                                          //Variables globales obtenidas de json
$action = $_POST["action"];


//======================================================================================================================
//                                                          //Selecciona el metodo a ejecutar, se coloca solo por
//                                                          //    estandar
switch ($action){
  case "echoDeleteProject": TransactionController::echoDeleteProject();
      break;
  case "echoSaveProject": TransactionController::echoSaveProject();
      break;
    case "echoAddProject": TransactionController::echoAddProject();
        break;
    case "echoAddEmployee": TransactionController::echoAddEmployee();
          break;
    case "echoDeleteEmployee": TransactionController::echoDeleteEmployee();
          break;
    case "echoUpdateEmployee": TransactionController::echoUpdateEmployee();
          break;
    case "echoAssingProject": TransactionController::echoAssingProject();
          break;
    case 'echoDeleteEmployeeProject': TransactionController::echoDeleteEmployeeProject();
          break;
    case 'echoAddEmployeeDependent': TransactionController::echoAddEmployeeDependent();
      break;
    case 'echoDeleteEmployeeDependent': TransactionController::echoDeleteEmployeeDependent();
       break;
   case 'echoAddDepartment': TransactionController::echoAddDepartment();
      break;
   case 'echoDeleteDepartment': TransactionController::echoDeleteDepartment();
      break;
    case 'echoDeleteLocations': TransactionController::echoDeleteLocations();
        break;
   case 'echoAddLocation': TransactionController::echoAddLocation();
      break;
   case 'echoSaveDepartment': TransactionController::echoSaveDepartment();
      break;

}

//======================================================================================================================
//                                                          //Con el objetivo de mantener modularidad se van a agregar
//                                                          //    todos los metodos dentro de una clase con un nombre
//                                                          //    representativo
class TransactionController
{
   //-------------------------------------------------------------------------------------------------------------------
   //                                                       //Funcion principal que va diagnosticar el resultado del
   //                                                       //    login, se decidio dividir el problema en submetodos
   public static function echoAddEmployee()
   {
     $strSSN_I = $_POST["strSSN_I"];
     $strFName_I = $_POST["strFName_I"];
     $strLName_I = $_POST["strLName_I"];
     $strBDate_I = $_POST["strBDate_I"];
     $strAddress_I = $_POST["strAddress_I"];
     $strSex_I = $_POST["strSex_I"];
     $strSalary_I = $_POST["strSalary_I"];
     $strSuperSSN_I = $_POST["strSuperSSN_I"];
     $strDNo_I = $_POST["strDNo_I"];

     $strResult = "";

     if ($strSSN_I == "" || $strFName_I == "" || $strBDate_I == "" || $strAddress_I == ""|| $strLName_I == "" ||
         $strSalary_I == "")
     {
        $strResult = CompanyDB::strAlert("Tienes que llenar todos los campos con asterisco *");
     }
     else
     {
         if ($strSuperSSN_I == "null")
         {
            $strSuperSSN_I = 'NULL';
         }

        if  ($strDNo_I == "null")
         {
            $strDNo_I = 'NULL';
         }

         $strResult = Company::echoAddEmployee($strSSN_I, $strFName_I, $strLName_I, $strBDate_I, $strAddress_I,
              $strSex_I, $strSalary_I, $strSuperSSN_I, $strDNo_I);
      }

      echo $strResult;
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoAddEmployeeDependent()
   {
      $strSSN_I = $_POST["strSSN_I"];
      $strNameD_I = $_POST["strNameD_I"];
      $strBDate_I = $_POST["strBDateD_I"];
      $strRelationshipD_I = $_POST["strRelationshipD_I"];
      $strSexD_I = $_POST["strSexD_I"];

      echo Company::echoAddEmployeeDependent($strSSN_I, $strNameD_I, $strBDate_I, $strRelationshipD_I, $strSexD_I);
   }


   //-------------------------------------------------------------------------------------------------------------------
}


//======================================================================================================================
?>
