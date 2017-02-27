<?php

//======================================================================================================================
include '0-CompanyDB.php';

//                                                          //Variables globales obtenidas de json
$action = $_POST["action"];
$strSSN_I = $_POST["strSSN_I"];

//======================================================================================================================
//                                                          //Selecciona el metodo a ejecutar, se coloca solo por
//                                                          //    estandar
switch ($action){
    case "echoAddEmployee": Company::echoAddEmployee($strSSN_I);
          break;
    case "echoDeleteEmployee": Company::echoAddEmployee($strSSN_I);
          break;
}

//======================================================================================================================
//                                                          //Con el objetivo de mantener modularidad se van a agregar
//                                                          //    todos los metodos dentro de una clase con un nombre
//                                                          //    representativo
class Company
{
   //-------------------------------------------------------------------------------------------------------------------
   //                                                       //Funcion principal que va diagnosticar el resultado del
   //                                                       //    login, se decidio dividir el problema en submetodos
   public static function echoAddEmployee($strSSN_I)
   {

     $strFName_I = $_POST["strFName_I"];
     $strLName_I = $_POST["strLName_I"];
     $strBDate_I = $_POST["strBDate_I"];
     $strAddress_I = $_POST["strAddress_I"];
     $strSex_I = $_POST["strSex_I"];
     $strSalary_I = $_POST["strSalary_I"];
     $strSuperSSN_I = $_POST["strSuperSSN_I"];
     $strDNo_I = $_POST["strDNo_I"];

      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

         $sql = "INSERT INTO Employee (SSN, FNAME, LNAME, BDATE, ADDRES, SEX, SALARY,SUPERSSN, DNO)
                  VALUES ('$strSSN_I','$strFName_I', '$strLName_I', '$strBDate_I', '$strAddress_I', '$strSex_I', $strSalary_I,
                  '$strSuperSSN_I',$strDNo_I)";
      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, $sql);

      if ($result === TRUE) {
          echo CompanyDB::strSucces("Empleado agregado correctamente!");;
      } else {
          echo "Error: " . $sql . "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
}

//START TRANSACTION;
//DELETE FROM works_on WHERE ESSN = '2343';
//DELETE FROM dependent WHERE ESSN = '2343';
//DELETE FROM Employee WHERE SSN = '2343';
//COMMIT;

//======================================================================================================================
?>
