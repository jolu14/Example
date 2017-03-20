//======================================================================================================================
$(document).ready(function ()
{

	var jsonData = {
			"action": "echoGetAllSupervisor"
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
					for (var x = 0; x < dataArray.length; x++) {
							 $("#inSuperSSN").append(
									 "<option value=\"" + dataArray[x][0] + "\">"+dataArray[x][1]+"</option> "
									 );
					}

			}
	});

	//--------------------------------------------------------------------------------------------------------------------
	$("#btnAddDep").on("click", function(){
		//                                                  //Previene clicks no deseados
		event.preventDefault();
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		//                                                  //Datos que se pasanan del formulario de html a json para
		//                                                  //      llegar al archivo php. En este caso para realizar el
		//                                                  //      login
		var jsonData3 =
		{
				"strDNumber_I": $("#inDNumber").val(),
				"strDName_I": $("#inDName").val(),
				"strSuperSSN_I":  $("#inSuperSSN :selected").val(),
				"action": "echoAddDepartment"
		};

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		$.ajax({
				url: "../Model/4-TransactionsDB.php",
				type: "POST",
				data: jsonData3,

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				success: function(jsonResponse)
				{
					var str = jsonResponse;
					if (str.includes("Success"))
					{
							if (!$("#formAddDep").is(":hidden"))
							{
									$("#formAddDep").toggle("slow");
									$("#btnAddDep").toggle("slow");
							}
							subShowNotify(jsonResponse,'success',8000);
						}
						else
						{
								subShowNotify(jsonResponse,'danger',8000);
					 }
				},

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				error: function(errorMessage)
				{

				}

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		});


	});

});
