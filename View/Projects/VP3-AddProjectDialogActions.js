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
    							 $("#inDNum").append(
    							 "<option value=\"" + dataArray[x][0] + "\">"+dataArray[x][1]+"</option>"
    								 );
    					}

    			}
    	});
    }

    bootstrap_alert = function () {}
    bootstrap_alert.warning = function (message, alert, timeout)
    {
        $(".alert").remove();
        $('<div id="floating_alert" class="alert alert-' + alert + ' fade in"><button type="button" class="close" '+
            'data-dismiss="alert" aria-hidden="true">×</button>' + message + '&nbsp;&nbsp;</div>').appendTo('body');
        setTimeout(function () {
            $(".alert").remove();
            }, timeout);

    }

    //--------------------------------------------------------------------------------------------------------------------
	$("#btnAddP").on("click", function(){
		//                                                  //Previene clicks no deseados
		event.preventDefault();
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		//                                                  //Datos que se pasanan del formulario de html a json para
		//                                                  //      llegar al archivo php. En este caso para realizar el
		//                                                  //      login
		var jsonData3 =
		{
				"strPNumber_I": $("#inPNumber").val(),
				"strPName_I": $("#inPName").val(),
                "strPLocation_I": $("#inPLocation").val(),
				"strDNum_I":  $("#inDNum :selected").val(),
				"action": "echoAddProject"
		};

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		$.ajax({
				url: "../Model/4-TransactionsDB.php",
				type: "POST",
				data: jsonData3,

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				success: function(jsonResponse)
				{
                    console.log(jsonResponse);
					var str = jsonResponse;
                    if (str.includes("Success"))
					{
					    bootstrap_alert.warning (str, 'success', 8000);
                    }
                    else {
                        bootstrap_alert.warning (str, 'danger', 8000);
                    }
				},

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				error: function(errorMessage)
				{
                    bootstrap_alert.warning (errorMessage, 'danger', 8000);
				}

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		});
});


});

//======================================================================================================================
