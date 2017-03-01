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
    case "echoDeleteEmployee": Company::echoDeleteEmployee($strSSN_I);
          break;
    case "echoUpdateEmployee": Company::echoUpdateEmployee();
          break;
    case "echoAssingProject": Company::echoAssingProject();
          break;
    case 'echoDeleteEmployeeProject': Company::echoDeleteEmployeeProject();
          break;
    case 'echoAddEmployeeDependent': Company::echoAddEmployeeDependent();
      break;
    case 'echoDeleteEmployeeDependent': Company::echoDeleteEmployeeDependent();
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

     if ($strSSN_I == "" || $strFName_I == "" || $strBDate_I == "" || $strAddress_I == ""|| $strLName_I == "" ||
         $strSalary_I == "")
     {
        echo CompanyDB::strAlert("Tienes que llenar todos los campos con asterisco *");
     }
     else
     {
         //                                                    //Se crea la conexion a la base de datos
         $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);
         $sql = "";
         if ($strSuperSSN_I != "null" && $strDNo_I != "null")
         {
         $sql = "INSERT INTO Employee (SSN, FNAME, LNAME, BDATE, ADDRES, SEX, SALARY,SUPERSSN, DNO)
                  VALUES ('$strSSN_I','$strFName_I', '$strLName_I', '$strBDate_I', '$strAddress_I', '$strSex_I',
                     $strSalary_I, '$strSuperSSN_I',$strDNo_I)";
         }
         else if ($strSuperSSN_I == "null")
         {
            $sql = "INSERT INTO Employee (SSN, FNAME, LNAME, BDATE, ADDRES, SEX, SALARY, DNO)
                     VALUES ('$strSSN_I','$strFName_I', '$strLName_I', '$strBDate_I', '$strAddress_I', '$strSex_I',
                     $strSalary_I ,$strDNo_I)";
         }
         else
         {
            $sql = "INSERT INTO Employee (SSN, FNAME, LNAME, BDATE, ADDRES, SEX, SALARY,SUPERSSN)
                     VALUES ('$strSSN_I','$strFName_I', '$strLName_I', '$strBDate_I', '$strAddress_I', '$strSex_I',
                        $strSalary_I, '$strSuperSSN_I')";
         }
         //                                                    //Se ejecuta el query deseado que esta almacendado en la
         //                                                    //    base de datos con stored procedures, que en este
         //                                                    //    caso solo es checara al usuario
         $result = mysqli_query($connection, $sql);

         if ($result == TRUE)
         {
            echo CompanyDB::strSucces("Empleado agregado correctamente!");;
         }
         else
         {
            echo "Error: " . $sql . "<br>" . $result->error;
         }
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoAddEmployeeDependent()
   {
      $strSSN_I = $_POST["strSSN_I"];
     $strNameD_I = $_POST["strNameD_I"];
     $strBDate_I = $_POST["strBDateD_I"];
     $strRelationshipD_I = $_POST["strRelationshipD_I"];
     $strSexD_I = $_POST["strSexD_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $sql = "INSERT INTO Dependent (ESSN, DEPENDENT_NAME, SEX, BDATE, RELATIONSHIP)
               VALUES ('$strSSN_I','$strNameD_I', '$strSexD_I', '$strBDate_I', '$strRelationshipD_I')";

      $result = mysqli_query($connection, $sql);


      if ($result == TRUE) {
          echo CompanyDB::strSucces("Empleado eliminado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteEmployee('$strSSN_I');". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoDeleteEmployee($strSSN_I)
   {
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $result = mysqli_query($connection, "CALL stpDeleteEmployee('$strSSN_I')");

      $count = mysqli_num_rows($result);

      if ($count == 0) {
          echo CompanyDB::strSucces("Empleado eliminado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteEmployee('$strSSN_I');". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoDeleteEmployeeProject()
   {
      $strSSN_I = $_POST["strSSN_I"];
      $strPNO_I = $_POST["strPNO_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $result = mysqli_query($connection, "DELETE FROM works_on WHERE ESSN = $strSSN_I AND pno = $strPNO_I;");

      $result = mysqli_query($connection,"SELECT * FROM works_on WHERE ESSN = $strSSN_I AND pno = $strPNO_I;");
      $count = mysqli_num_rows($result);

      if ($count == 0) {
          echo CompanyDB::strSucces("Empleado eliminado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteEmployee('$strSSN_I');". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoDeleteEmployeeDependent()
   {
      $strSSN_I = $_POST["strSSN_I"];
      $strDName_I = $_POST["strDName_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $result = mysqli_query($connection, "DELETE FROM Dependent WHERE ESSN = '$strSSN_I' AND DEPENDENT_NAME = '$strDName_I';");

      $result = mysqli_query($connection,"SELECT * FROM Dependent WHERE ESSN = '$strSSN_I' AND DEPENDENT_NAME = '$strDName_I';");
      $count = mysqli_num_rows($result);

      if ($count == 0) {
          echo CompanyDB::strSucces("Dependiente eliminado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteEmployee('$strSSN_I');". "<br>" . $result->error;
      }
   }


   //-------------------------------------------------------------------------------------------------------------------
   public static function echoUpdateEmployee()
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
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures

      if ($strSuperSSN_I == "null")
      {
         $strSuperSSN_I = "NULL";
      }
      else
      {
         $strSuperSSN_I = "'$strSuperSSN_I'";
      }

      if ($strDNo_I == "null")
      {
         $strDNo_I = "NULL";
      }


      $sql = "UPDATE Employee SET FNAME='$strFName_I', LNAME='$strLName_I', BDATE='$strBDate_I', ADDRES='$strAddress_I',
            SEX='$strSex_I', SALARY=$strSalary_I, DNO = $strDNo_I, SUPERSSN = $strSuperSSN_I  WHERE SSN='$strSSN_I'";

      $result = mysqli_query($connection, $sql);
      if ($result)
      {
         echo CompanyDB::strSucces("Empleado actualizado correctamente!");;
      }
      else
      {
         echo "Error: $sql". "<br>" . $result;
      }

   }

   //-------------------------------------------------------------------------------------------------------------------
   //                                                       //Funcion principal que va diagnosticar el resultado del
   //                                                       //    login, se decidio dividir el problema en submetodos
   public static function echoAssingProject()
   {
      $strSSN_I = $_POST["strSSN_I"];
      $strHours_I = $_POST["strHours_I"];
      $strPNo_I = $_POST["strPNo_I"];

       //                                               //Se crea la conexion a la base de datos
       $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);


       $sql = "INSERT INTO WORKS_ON (ESSN, PNO, HOURS) VALUES ('$strSSN_I',$strPNo_I, $strHours_I)";

         //                                                    //Se ejecuta el query deseado que esta almacendado en la
         //                                                    //    base de datos con stored procedures, que en este
         //                                                    //    caso solo es checara al usuario
         $result = mysqli_query($connection, $sql);

         if ($result == TRUE)
         {
            echo CompanyDB::strSucces("Proyecto asignado correctamente!");;
         }
         else
         {
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
