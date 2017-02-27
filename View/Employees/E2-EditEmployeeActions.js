//======================================================================================================================
$(document).ready(function()
{

    //==================================================================================================================
    //														                          //Prepara las configuraciones inicales para la pagina
    //														                          //		cargada. En este caso se carga informacion a
    //                                                      //    diferentes elementos del html.
    var jsonData = {
        "action": "echoGetAllSupervisor"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData,

        //                                                  //Carga todos los supervisores al select box para
        //                                                  //    seleccionar 1 si es necesario.
        success: function(jsonResponse)
        {
            console.log(jsonResponse);
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++)
            {
                //                                          //Agrega la opcion y establece el value como el id.
                $("#inSuperSSN").append(
                    "<option value=\"" + dataArray[x][0] + "\">" + dataArray[x][1] + "</option> "
                );
            }
        }
    });

    //------------------------------------------------------------------------------------------------------------------
    var jsonData2 = {
        "action": "echoGetAllDepartment"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData2,

        //                                                  //Carga todos los departamentos al select box para
        //                                                  //    seleccionar 1 si es necesario.
        success: function(jsonResponse)
        {
            console.log(jsonResponse);
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++)
            {
                //                                          //Agrega la opcion y establece el value como el id.
                $("#inDNo").append(
                    "<option value=\"" + dataArray[x][0] + "\">" + dataArray[x][1] + "</option> "
                );
            }

        }
    });

    //------------------------------------------------------------------------------------------------------------------
    var jsonData1 = {
        "strSSN_I": $("#lblSSN").val(),
        "action": "echoGetEmployee"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData1,

        //                                                  //Carga toda la informacion del empleado en los elementos
        //                                                  //    de html deseados la informacion se transfroma en un
        //                                                  //    arreglo entendido por js y procesa su informacio.
        success: function(jsonResponse)
        {
            var dataArray = jQuery.parseJSON(jsonResponse);
            document.getElementById("lblEmployee").innerHTML =
                "Empleado / " + dataArray[0][1] + " " + dataArray[0][2];
            document.getElementById("inSSN").value = dataArray[0][0];
            document.getElementById("inFName").value = dataArray[0][1];
            document.getElementById("inLName").value = dataArray[0][2];
            document.getElementById("inBDate").value = dataArray[0][3];
            document.getElementById("inAddress").value = dataArray[0][4];
            if (dataArray[0][5] == "M")
            {
                document.getElementById("sex-m").checked = true;
            } else
            {
                document.getElementById("sex-f").checked = true;
            }
            document.getElementById("inSalary").value = dataArray[0][6];
            document.getElementById("inSuperSSN").value = dataArray[0][7];
            document.getElementById("inDNo").value = dataArray[0][8];
        }
    });

    //------------------------------------------------------------------------------------------------------------------
    var jsonData1 = {
        "strSSN_I": $("#lblSSN").val(),
        "action": "echoGetDependentEmployee"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData1,

        success: function(jsonResponse) {

            console.log(jsonResponse);
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++) {
                $("#tbDependent").append(
                    "<tr id=\"" + dataArray[x][0] + "\"style=\"cursor: pointer\"><td hidden=\"true\" class=\"edit\"><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\"><button class=\" btn " +
                    "btn-danger btn-xs\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" ><span "+
                    "class=\"glyphicon glyphicon-trash\"></span></button></p></td>" +
                    "</td><td hidden=\"true\" class=\"edit\"><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\"><button class=\" btn " +
                    "btn-primary btn-xs\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" ><span "+
                    "class=\"glyphicon glyphicon-edit\"></span></button></p></td>" +
                    "</td><td>" + dataArray[x][0] +
                    "</td><td>" + dataArray[x][1] +
                    "</td><td>" + dataArray[x][2] +
                    "</td><td>" + dataArray[x][3] +
                    "</td></tr>");
            }

        }
    });

    //------------------------------------------------------------------------------------------------------------------
    var jsonData4 = {
        "strSSN_I": $("#lblSSN").val(),
        "action": "echoGetProyectsEmployee"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData4,

        success: function(jsonResponse) {

            console.log(jsonResponse);
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++) {
                $("#tbProjects").append(
                    "<tr id=\"" + dataArray[x][0] + "\"style=\"cursor: pointer\"><td hidden=\"true\" class=\"edit\"><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\"><button class=\" btn " +
                    "btn-danger btn-xs\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" ><span "+
                    "class=\"glyphicon glyphicon-trash\"></span></button></p></td>" +
                    "</td><td>" + dataArray[x][0] +
                    "</td><td>" + dataArray[x][1] +
                    "</td><td>" + dataArray[x][2] +
                    "</td></tr>");
            }

        }
    });

    //==================================================================================================================
    //														//Estos metodos ejecutan las opciones del menu central,
    //														//		carga la pagina deseada dentro del div.
    $("#btnReturnToTable").unbind().click(function()
    {
        console.log("btnReturnToTable");
        $("#divView").load("Employees/E1-EmployeeTableView.html");
    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnEditEmployee").unbind().click(function()
    {
        $(".edit").show();
        console.log("btnEditEmployee");
        if ($("#divBtnSave").is(":hidden"))
        {
            $("#divBtnSave").toggle();
        }

        if ($("#divBtnEdit").is(":hidden"))
        {
            $("#divBtnEdit").toggle();
        }

        if (!$("#btnEditEmployee").is(":hidden"))
        {
            $("#btnEditEmployee").toggle();
        }
        if (!$("#btnDeleteEmployee").is(":hidden"))
        {
            $("#btnDeleteEmployee").toggle();
        }


        document.getElementById('inSSN').readOnly = false;
        document.getElementById('inFName').readOnly = false;
        document.getElementById('inLName').readOnly = false;
        document.getElementById('inBDate').readOnly = false;
        document.getElementById('inAddress').readOnly = false;
        document.getElementById('inSalary').readOnly = false;

        document.getElementById('sex-m').disabled = false;
        document.getElementById('sex-f').disabled = false;
        document.getElementById('inDNo').disabled = false;
        document.getElementById('inSuperSSN').disabled = false;

    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnSaveEmployee").unbind().click(function()
    {
        $(".edit").hide();
        console.log("btnSaveEmployee");

        if (!$("#divBtnSave").is(":hidden"))
        {
            $("#divBtnSave").toggle();
        }

        if (!$("#divBtnEdit").is(":hidden"))
        {
            $("#divBtnEdit").toggle();
        }

        if ($("#btnEditEmployee").is(":hidden"))
        {
            $("#btnEditEmployee").toggle();
        }

        if ($("#btnDeleteEmployee").is(":hidden"))
        {
            $("#btnDeleteEmployee").toggle();
        }

        document.getElementById('inSSN').readOnly = true;
        document.getElementById('inFName').readOnly = true;
        document.getElementById('inLName').readOnly = true;
        document.getElementById('inBDate').readOnly = true;
        document.getElementById('inAddress').readOnly = true;
        document.getElementById('inSalary').readOnly = true;

        document.getElementById('sex-m').disabled = true;
        document.getElementById('sex-f').disabled = true;
        document.getElementById('inDNo').disabled = true;
        document.getElementById('inSuperSSN').disabled = true;

    });

	//------------------------------------------------------------------------------------------------------------------
	$("#btnDeleteEmployee").on("click", function(){
		//                                                  //Previene clicks no deseados
		event.preventDefault();
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		//                                                  //Datos que se pasanan del formulario de html a json para
		//                                                  //      llegar al archivo php. En este caso para realizar el
		//                                                  //      delete
		var jsonData3 =
		{
				"strSSN_I": $("#inSSN").val(),
				"action": "echoDeleteEmployee"
		};

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		$.ajax({
				url: "../Model/4-TransactionsDB.php",
				type: "POST",
				data: jsonData3,

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				success: function(jsonResponse)
				{
					var str = jsonResponse;
					if (str.includes("Success"))
					{
							$("#divSucces").html(jsonResponse);
							if ($("#divSucces").is(":hidden"))
							{
									$("#divSucces").toggle("slow");
							}

							if (!$("#formEmploye").is(":hidden"))
							{
									$("#formEmploye").toggle("slow");
							}

                            if (!$("#btnDeleteEmployee").is(":hidden"))
							{
									$("#btnDeleteEmployee").toggle("slow");
							}

                            if (!$("#btnEditEmployee").is(":hidden"))
							{
									$("#btnEditEmployee").toggle("slow");
							}
						}
						else
						{
								$("#divAlert").html(jsonResponse);
								if ($("#divAlert").is(":hidden"))
								{
									$("#divAlert").toggle("slow");
								}
					 }
				},

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				error: function(errorMessage) {
                    $("#divAlert").html(errorMessage);
                    if ($("#divAlert").is(":hidden"))
                    {
                        $("#divAlert").toggle("slow");
                    }
				}

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		});
    });


    //==================================================================================================================
});

//======================================================================================================================
