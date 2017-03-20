<?php

//======================================================================================================================
include '0-CompanyDB.php';

//                                                          //Variables globales obtenidas de json
$action = $_POST["action"];


//======================================================================================================================
//                                                          //Selecciona el metodo a ejecutar, se coloca solo por
//                                                          //    estandar
switch ($action){
  case "echoDeleteProject": Company::echoDeleteProject();
      break;
  case "echoSaveProject": Company::echoSaveProject();
      break;
    case "echoAddProject": Company::echoAddProject();
        break;

    case "echoDeleteEmployee": Company::echoDeleteEmployee();
          break;
    case "echoUpdateEmployee": Company::echoUpdateEmployee();
          break;
    case "echoAssingProject": Company::echoAssingProject();
          break;
    case 'echoDeleteEmployeeProject': Company::echoDeleteEmployeeProject();
          break;
    case 'echoDeleteEmployeeDependent': Company::echoDeleteEmployeeDependent();
       break;
   case 'echoAddDepartment': Company::echoAddDepartment();
      break;
   case 'echoDeleteDepartment': Company::echoDeleteDepartment();
      break;
    case 'echoDeleteLocations': Company::echoDeleteLocations();
        break;
   case 'echoAddLocation': Company::echoAddLocation();
      break;
   case 'echoSaveDepartment': Company::echoSaveDepartment();
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
   public static function echoAddEmployee($strSSN_I, $strFName_I, $strLName_I, $strBDate_I, $strAddress_I, $strSex_I,
   $strSalary_I, $strSuperSSN_I, $strDNo_I)
   {
         //                                                    //Se crea la conexion a la base de datos
         $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

         $sql = "CALL stpAddEmployee('$strSSN_I','$strFName_I', '$strLName_I', '$strBDate_I', '$strAddress_I', '$strSex_I',
                     $strSalary_I, '$strSuperSSN_I',$strDNo_I)";

         if ($strSuperSSN_I = 'NULL')
         {
            $sql = "CALL stpAddEmployee('$strSSN_I','$strFName_I', '$strLName_I', '$strBDate_I', '$strAddress_I', '$strSex_I',
                        $strSalary_I, $strSuperSSN_I,$strDNo_I)";
         }

         //                                                    //Se ejecuta el query deseado que esta almacendado en la
         //                                                    //    base de datos con stored procedures, que en este
         //                                                    //    caso solo es checara al usuario
         $result = mysqli_query($connection, $sql);

         if ($result == TRUE)
         {
            return CompanyDB::strSucces("Empleado agregado correctamente!");
         }
         else
         {
            return CompanyDB::strAlert($sql);
         }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoAddEmployeeDependent($strSSN_I, $strNameD_I, $strBDate_I, $strRelationshipD_I, $strSexD_I)
   {
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $sql = "INSERT INTO Dependent (ESSN, DEPENDENT_NAME, SEX, BDATE, RELATIONSHIP)
               VALUES ('$strSSN_I','$strNameD_I', '$strSexD_I', '$strBDate_I', '$strRelationshipD_I')";

      $result = mysqli_query($connection, $sql);


      if ($result == TRUE)
      {
          $result = CompanyDB::strSucces("Dependiente agregado correctamente!");;
      }
      else
      {
          $result = "Error".$sql. "<br>";
      }

      return $result;
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoAddDepartment()
   {
      $strDNumber_I = $_POST["strDNumber_I"];
     $strDName_I = $_POST["strDName_I"];
     $strSuperSSN_I = $_POST["strSuperSSN_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $sql = "INSERT INTO Department (Dname, Dnumber, Mgrssn)
               VALUES ('$strDName_I','$strDNumber_I', '$strSuperSSN_I')";

      $result = mysqli_query($connection, $sql);


      if ($result == TRUE) {
          echo CompanyDB::strSucces("Departamento agregado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteEmployee($strDName_I, $strDNumber_I ,$strSuperSSN_I);". "<br>";
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoDeleteEmployee()
   {
      $strSSN_I = $_POST["strSSN_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures

      $sql =  "CALL stpDeleteEmployee('$strSSN_I')";
      $result = mysqli_query($connection, "CALL stpDeleteEmployee('$strSSN_I')");

      $count = mysqli_num_rows($result);

      if ($count == 0) {
          echo CompanyDB::strSucces("Empleado eliminado correctamente!");;
      } else {
          echo "Error: $sql". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoDeleteDepartment()
   {
      $strDNum_I = $_POST["strDNum_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures

      $sql =  "CALL stpDeleteDepartment('$strDNum_I')";
      $result = mysqli_query($connection, $sql);

      $count = mysqli_num_rows($result);

      if ($count == 0) {
          echo CompanyDB::strSucces("Departamento $strDNum_I eliminado correctamente!");;
      } else {
          echo "Error: $sql". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoDeleteLocations()
   {
      $strDNum_I = $_POST["strDNum_I"];
      $strDLocation_I = $_POST["strDLocation_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $result = mysqli_query($connection, "DELETE FROM dept_locations WHERE '$strDNum_I' = dnumber AND '$strDLocation_I' = dlocation");

      if ($result == true) {
          echo CompanyDB::strSucces("Locacion $strDNum_I eliminado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteDepartment('$strDNum_I');". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoAddLocation()
   {
      $strDNum_I = $_POST["strDNum_I"];
      $strDLocation_I = $_POST["strDLocation_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $result = mysqli_query($connection, "INSERT INTO dept_locations VALUES ('$strDNum_I', '$strDLocation_I')");

      if ($result == true) {
          echo CompanyDB::strSucces("Locacion AGREAGADA eliminado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteDepartment('$strDNum_I');". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoAddProject()
   {
      $strPNumber_I = $_POST["strPNumber_I"];
      $strPName_I = $_POST["strPName_I"];
      $strPLocation_I= $_POST["strPLocation_I"];
      $strDNum_I= $_POST["strDNum_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $result = mysqli_query($connection, "INSERT INTO Project VALUES ('$strPName_I', $strPNumber_I, '$strPLocation_I', $strDNum_I)");

      if ($result == true) {
          echo CompanyDB::strSucces("Proyecto agregado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteDepartment('$strDNum_I');". "<br>" . $result->error;
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
            echo CompanyDB::strSucces("Proyecto eliminado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteEmployee('$strSSN_I');". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoDeleteProject()
   {
      $strPNO_I = $_POST["strPNumber_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $result = mysqli_query($connection, "CALL stpDeleteProject('$strPNO_I')");

      $count = mysqli_num_rows($result);

      if ($count == 0) {
            echo CompanyDB::strSucces("Proyecto eliminado correctamente!");;
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
   public static function echoSaveDepartment()
   {
      $strDNum_I= $_POST["strDNum_I"];
      $strDName_I = $_POST["strDName_I"];
      $strManSSN_I = $_POST["strManSSN_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $sql = "UPDATE Department SET dNAME='$strDName_I', dnumber='$strDNum_I', MGRSSN='$strManSSN_I' WHERE dnumber='$strDNum_I'";
      $result = mysqli_query($connection,$sql);


      if ($result == true) {
          echo CompanyDB::strSucces("Departamento actualizado correctamente!");;
      } else {
          echo "Error: CALL stpDeleteEmployee('$strSSN_I');". "<br>" . $result->error;
      }
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoSaveProject()
   {
      $strPNumber_I = $_POST["strPNumber_I"];
      $strPName_I = $_POST["strPName_I"];
      $strPLocation_I = $_POST["strPLocation_I"];
      $strDNum_I = $_POST["strDNum_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures
      $sql = "UPDATE Project SET pNAME='$strPName_I', dnum='$strDNum_I', plocation='$strPLocation_I' WHERE pnumber='$strPNumber_I'";
      $result = mysqli_query($connection,$sql);


      if ($result == true) {
          echo CompanyDB::strSucces("Proyecto actualizado correctamente!");;
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

//======================================================================================================================
?>
