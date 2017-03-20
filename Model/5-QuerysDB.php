<?php

//======================================================================================================================
include '0-CompanyDB.php';

//                                                          //Variables globales obtenidas de json
$action = $_POST["action"];

//======================================================================================================================
//                                                          //Selecciona el metodo a ejecutar, se coloca solo por
//                                                          //    estandar
switch ($action)
{
   case "echoGetAllEmployeesProject": Company::echoGetAllEmployeesProject();
      break;
    case "echoGetEmployeesBDate": Company::echoGetEmployeesBDate();
        break;
    case "echoGetAllEmployeesSalary": Company::echoGetAllEmployeesSalary();
        break;
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
    case "echoGetAllProject": Company::echoGetAllProject();
          break;
    case "echoGetDepartmentTable": Company::echoGetDepartmentTable();
          break;
    case "echoGetProjectTable": Company::echoGetProjectTable();
          break;
    case 'echoGetLocations': Company::echoGetLocations();
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

   public static function echoGetAllEmployeesSalary()
   {
      $strSalary_I = $_POST["strSalary_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT e.SSN, e.FNAME, e.LNAME,DATE_FORMAT(e.BDate, \"%d-%M-%Y\"), e.ADDRES, e.SEX,
            e.SALARY, CONCAT(s.FNAME, ' ' ,s.LNAME), d.DNAME  FROM Employee e LEFT JOIN Department d ON DNO = DNUMBER LEFT JOIN
            Employee s ON e.SUPERSSN = s.SSN WHERE E.SALARY >= $strSalary_I");

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   public static function echoGetEmployeesBDate()
   {
      $strBDate1_I = $_POST["strBDate1_I"];
      $strBDate2_I = $_POST["strBDate2_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      $query = "SELECT e.SSN, e.FNAME, e.LNAME,DATE_FORMAT(e.BDate, \"%d-%M-%Y\"), e.ADDRES, e.SEX,
            e.SALARY, CONCAT(s.FNAME, ' ' ,s.LNAME), d.DNAME  FROM Employee e LEFT JOIN Department d ON DNO = DNUMBER LEFT JOIN
            Employee s ON e.SUPERSSN = s.SSN WHERE e.BDate >= '$strBDate1_I' AND e.BDate <= '$strBDate2_I'";
      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection,$query );

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
   //                                                       //Funcion principal que va diagnosticar el resultado del
   //                                                       //    login, se decidio dividir el problema en submetodos
   public static function echoGetLocations()
   {
      $strDNumber_I = $_POST["strDNum_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT * FROM dept_locations WHERE dnumber = $strDNumber_I");

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
   public static function echoGetDepartmentTable()
   {
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT D.DNUMBER, D.DNAME, CONCAT(FNAME, ' ' ,LNAME ), D.MGRSSN FROM Department D  JOIN
      Employee E ON D.MGRSSN = E.SSN");

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoGetProjectTable()
   {
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT p.pnumber, p.pname, p.plocation, D.DNAME, p.dnum FROM Project p  JOIN
      Department D ON D.dnumber = p.dnum");

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
      $result = mysqli_query($connection, "SELECT p.pNAME, p.pLOCATION, d.dname, w.essn, w.pno, w.HOURS FROM Works_On w JOIN Project p ON
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
   public static function echoGetAllEmployeesProject()
   {
      $strPNo_I = $_POST["strPNo_I"];
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT w.essn, CONCAT(FNAME, ' ' ,LNAME ) FROM Works_On w JOIN employee e ON
         w.essn = e.ssn where pno = $strPNo_I" );

      $outArray = array();
      if ($result)
      {
         while ($row = mysqli_fetch_row($result))
         $outArray[] = $row;
      }

      print json_encode($outArray);
   }

   //-------------------------------------------------------------------------------------------------------------------
   public static function echoGetAllProject()
   {
      //                                                    //Se crea la conexion a la base de datos
      $connection = mysqli_connect(CompanyDB::$DB_SERVER,CompanyDB::$DB_USERNAME,CompanyDB::$DB_PASSWORD,
         CompanyDB::$DB_DATABASE);

      //                                                    //Se ejecuta el query deseado que esta almacendado en la
      //                                                    //    base de datos con stored procedures, que en este
      //                                                    //    caso solo es checara al usuario
      $result = mysqli_query($connection, "SELECT pNUMBER, pNAME FROM Project" );

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
