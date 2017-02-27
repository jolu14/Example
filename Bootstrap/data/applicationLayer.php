<?php
header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';
$action = $_POST["action"];

switch ($action){
    
    case "register": registerfunction();
                    break;
   
    case "removeAdmin":removeAdmin();
                    break;    

}


function validateAdmin(){
    
    $mat= $_POST["mat"];
    
    $result = searchAdmin($mat);
    
    if ($result["status"] == "SUCCESS"){
		 $response = array("message"=> "Admin already exists");
         echo json_encode($response); //sent it to presentation layer
    }	
    
    else{
        header('HTTP/1.1 500' . $result["status"]);
        die($result["status"]); //returns error from DataLayer
    }	

}

function registerFunction(){ //registers an admin 
    $fName = $_POST["fName"];
    $lName= $_POST["lName"];
    $passwrd = $_POST["password"];
    $mat= $_POST["mat"];
      
    $userPassword = encryptPassword();
        
    $result = attemptRegistration($fName, $lName, $mat, $userPassword);
    
    if ($result["status"] == "SUCCESS"){
		 $response = array("message"=> "Now you are register");
         echo json_encode($response); //sent it to presentation layer
    }	
    
    else{
        header('HTTP/1.1 500' . $result["status"]);
        die($result["status"]); //returns error from DataLayer
    }	       
}

f

function removeAdmin(){
    
    $mat= $_POST["mat"];
    
    $result= attemptRemoveAdmin($mat);
    
    if ($result["status"] == "SUCCESS"){
		$response = array("message"=> "Administrator deleted");
        echo json_encode($response); //sent it to presentation layer
    }	
    
    else{
        $response= array("message"=> "Administrator doesn't exists");
         echo json_encode($response);
    }	
    
}


function loadAdmins(){
    
    $result= loadAdministrators();
    echo json_encode($result);
}
?>