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

	var jsonData2 = {
			"action": "echoGetAllDepartment"
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
					for (var x = 0; x < dataArray.length; x++) {
							 $("#inDNo").append(
									 "<option value=\"" + dataArray[x][0] + "\">"+dataArray[x][1]+"</option> "
									 );
					}

			}
	});

	//--------------------------------------------------------------------------------------------------------------------
	$("#btnAdd").on("click", function(){
		//                                                  //Previene clicks no deseados
		event.preventDefault();
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		//                                                  //Datos que se pasanan del formulario de html a json para
		//                                                  //      llegar al archivo php. En este caso para realizar el
		//                                                  //      login
		var jsonData3 =
		{
				"strSSN_I": $("#inSSN").val(),
				"strFName_I": $("#inFName").val(),
				"strLName_I": $("#inLName").val(),
				"strBDate_I": $("#inBDate").val(),
				"strAddress_I": $("#inAddress").val(),
				"strSex_I": $("input[name=sx]:checked").val(),
				"strSalary_I": $("#inSalary").val(),
				"strSuperSSN_I":  $("#inSuperSSN :selected").val(),
				"strDNo_I": $("#inDNo :selected").val(),
				"action": "echoAddEmployee"
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
							$("#divSucces").html(jsonResponse);
							if ($("#divSucces").is(":hidden"))
							{
									$("#divSucces").toggle("slow");
							}

							if (!$("#formAddEmployee").is(":hidden"))
							{
									$("#formAddEmployee").toggle("slow");
									$("#btnAdd").toggle("slow");
							}

							if (!$("#divAlert").is(":hidden"))
              {
                  $("#divAlert").toggle("slow");
              }

							if ($("#btnCloseAndRefresh").is(":hidden"))
              {
                  $("#btnCloseAndRefresh").toggle();
              }

							if (!$("#btnClose").is(":hidden"))
              {
                  $("#btnClose").toggle();
              }
						}
						else
						{
								$("#divAlert").html(jsonResponse);
								if ($("#divAlert").is(":hidden"))
								{
									$	("#divAlert").toggle("slow");
								}
					 }
				},

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				error: function(errorMessage) {

				}

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		});


	});

	$("#btnCloseAndRefresh").on("click", function()
	{
		window.location = 'V1-MainMenuView.html?show=employees';
	});

});
