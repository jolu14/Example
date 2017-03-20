//======================================================================================================================
$(document).ready(function ()
{
    //==================================================================================================================
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. Inicialmente se debe cargar todos los
    //                                                      //      empleados registrados a la tabla.

    subLoadDepartments();

    //==================================================================================================================
    function subLoadDepartments()
    {
        var jsonData = {
    			"action": "echoGetAllDepartment"
    	};

    	//------------------------------------------------------------------------------------------------------------------
    	$.ajax({
    			url: "../Model/5-QuerysDB.php",
    			type: "POST",
    			data: jsonData,

    			success: function(jsonResponse)
    			{
    					console.log(jsonResponse);
    					var dataArray = jQuery.parseJSON(jsonResponse);
    					for (var x = 0; x < dataArray.length; x++)
    					{
    							 $("#inDNumb").append(
    							 "<option value=\"" + dataArray[x][0] + "\">"+dataArray[x][1]+"</option>"
    								 );
    					}

                        $("#inDNumb").val($("#inDNumH").val());

    			}
    	});
    }

    var jsonData2 = {
            "strPNo_I" : $("#inPNumber").val(),
            "action": "echoGetAllEmployeesProject"
    };

    //------------------------------------------------------------------------------------------------------------------
    $.ajax({
            url: "../Model/5-QuerysDB.php",
            type: "POST",
            data: jsonData2,

            success: function(jsonResponse)
            {
                    console.log(jsonResponse);
                    var dataArray = jQuery.parseJSON(jsonResponse);
                    for (var x = 0; x < dataArray.length; x++)
                    {
                        $("#tbEAssigned").append(
                            "<tr" + " id=\"" + dataArray[x][0] + "\""  + "><td>" + dataArray[x][0] +
                            "</td><td>" + dataArray[x][1] +
                            "</td></tr>");
                    }
            }
    });

    //------------------------------------------------------------------------------------------------------------------
	//                                                      //Click en un renglon de la tabla
	$("#btnSaveP").on('click', function()
	{
		//                                                  //Previene clicks no deseados
		event.preventDefault();
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		//                                                  //Datos que se pasanan del formulario de html a json para
		//                                                  //      llegar al archivo php. En este caso para realizar el
		//                                                  //      delete
		var jsonData3 = {
				"strPNumber_I": $("#inPNumber").val(),
				"strPName_I": $("#inPName").val(),
                "strPLocation_I": $("#inPLocation").val(),
				"strDNum_I": $("#inDNumb :selected").val(),
				"action": "echoSaveProject"
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
								subShowNotify(str, 'success', 8000);
						}
						else
						{
								subShowNotify(str, 'danger', 8000);
						}
				},

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				error: function(errorMessage) {
					subShowNotify(str, 'danger', 8000);
				}

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		});
		});

        $("#btnDelP").on('click', function()
    	{
    		var jsonData = {
    				"strPNumber_I": $("#inPNumber").val(),
    				"action": "echoDeleteProject"
    		};

    		//------------------------------------------------------------------------------------------------------------------
    		$.ajax({
    				url: "../Model/4-TransactionsDB.php",
    				type: "POST",
    				data: jsonData,

    				success: function(jsonResponse)
    				{
                        var str = jsonResponse;
						if (str.includes("Success"))
						{
								bootstrap_alert.warning(str, 'success', 8000);
                                $('#ProjectView').load(document.URL  +  ' #ProjectView');
						}
						else
						{
								bootstrap_alert.warning(str, 'danger', 8000);
						}
    				}
    		});
    	});

});

    //======================================================================================================================
