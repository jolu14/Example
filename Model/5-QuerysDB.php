<?php

//======================================================================================================================
include '0-CompanyDB.php';

//                                                          //Variables globales obtenidas de json
$action = $_POST["action"];

//======================================================================================================================
//                                                          //Selecciona el metodo a ejecutar, se coloca solo por
//                                                          //    estandar
switch ($action){
    case "echoGetAllEmployees": Company::echoGetAllEmployees();
          break;
    case "echoGetAllSupervisor": Company::echoGetAllSupervisor();
          break;
    case "echoGetAllDepartment": Company::echoGetAllDepartment();
          break;
    case "echoGetEmployee": Company::echoGetEmployee();
          break;
    case "echoGetDependentEmployee": Company::echoGetDependentEmployee();
          break;
    case "echoGetProyectsEmployee": Company::echoGetProyectsEmployee();
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
   public static function echoGetAllEmployees()
   {
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT e.SSN, e.FNAME, e.LNAME,DATE_FORMAT(e.BDate, \"%d-%M-%Y\"), e.ADDRES, e.SEX,
            e.SALARY, CONCAT(s.FNAME, ' ' ,s.LNAME), d.DNAME  FROM Employee e LEFT JOIN Department d ON DNO = DNUMBER LEFT JOIN
            Employee s ON e.SUPERSSN = s.SSN");

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoGetAllSupervisor()
   {
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT SSN, CONCAT(FNAME, ' ' ,LNAME) FROM Employee");

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoGetAllDepartment()
   {
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT DNUMBER, DNAME FROM Department");

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoGetEmployee()
   {
      $strSSN_I = $_POST["strSSN_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT e.SSN, e.FNAME, e.LNAME,DATE_FORMAT(e.BDate, \"%Y-%m-%d\"), e.ADDRES, e.SEX,
            e.SALARY, s.SSN, d.DNUMBER  FROM Employee e LEFT JOIN Department d ON DNO = DNUMBER LEFT JOIN
            Employee s ON e.SUPERSSN = s.SSN WHERE e.SSN = $strSSN_I" );

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoGetDependentEmployee()
   {
      $strSSN_I = $_POST["strSSN_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT d.DEPENDENT_NAME,DATE_FORMAT(d.BDATE, \"%d-%m-%Y\"), d.SEX,
            d.RELATIONSHIP FROM Employee e JOIN Dependent d ON e.ssn = d.essn WHERE e.SSN = $strSSN_I" );

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoGetProyectsEmployee()
   {
      $strSSN_I = $_POST["strSSN_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT p.pNAME, p.pLOCATION, d.dname FROM Works_On w JOIN Project p ON
         w.PNO = p.pNUMBER JOIN Department d ON d.dnumber = p.dNum WHERE w.ESSN = $strSSN_I" );

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
}

//======================================================================================================================
?>
