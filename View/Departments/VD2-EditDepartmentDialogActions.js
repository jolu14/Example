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
					for (var x = 0; x < dataArray.length; x++)
					{
							 $("#inManagerSSN").append(
									 "<option value=\"" + dataArray[x][0] + "\">"+dataArray[x][1]+"</option> "
									 );
								console.log( $("#inMSSN").val());
							document.getElementById("inManagerSSN").value =  $("#inMSSN").val();
					}

			}
	});

	//------------------------------------------------------------------------------------------------------------------
	$("#btnDelDep").on("click", function() {
			//                                                  //Previene clicks no deseados
			event.preventDefault();
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			//                                                  //Datos que se pasanan del formulario de html a json para
			//                                                  //      llegar al archivo php. En este caso para realizar el
			//                                                  //      delete
			var jsonData3 = {
					"strDNum_I": $("#inDNumber").val(),
					"action": "echoDeleteDepartment"
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
										subShowNotify(jsonResponse,'success',8000);

							}
							else
							{
									subShowNotify(jsonResponse,'danger',8000);
							}
					},

					// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
					error: function(errorMessage) {
							subShowNotify(errorMessage,'danger',8000);
					}

					// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			});
	});

	function subDeleteLocation(strDNum_I, strDLocation_I)
	{
		var jsonData = {
				"strDNum_I": strDNum_I,
				"strDLocation_I": strDLocation_I,
				"action": "echoDeleteLocations"
		};

		//------------------------------------------------------------------------------------------------------------------
		$.ajax({
				url: "../Model/4-TransactionsDB.php",
				type: "POST",
				data: jsonData,

				success: function(jsonResponse)
				{
					subDisplayLocations();
					console.log(jsonResponse);
				}
		});
	}

	subDisplayLocations();
	function subDisplayLocations()
	{
		var jsonData = {
				"strDNum_I": $("#inDNO").val(),
				"action": "echoGetLocations"
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
							$("#tbLoc").append(
									"<tr id1=\"" + dataArray[x][0] + "\" id2=\"" + dataArray[x][1] + "\"><td>" + dataArray[x][1] +
									"</td>" + "<td><p title=\"Del\"><button " +
									"class=\"btn btn-danger btn-xs \" ><span class=\"glyphicon glyphicon-trash\"></span></button></p" +
									"></td></tr>");
						}

				}
		});
	}

	//------------------------------------------------------------------------------------------------------------------
	//                                                      //Click en un renglon de la tabla
	$("#tbLoc").on('click', 'button', function(e)
	{
			var id1=$(this).parents('tr').attr('id1');
			var id2=$(this).parents('tr').attr('id2');
			console.log(id1);
			console.log(id2);
			 $("#tbLoc > tr").remove();
			subDeleteLocation(id1,id2);


	});

	//------------------------------------------------------------------------------------------------------------------
	//                                                      //Click en un renglon de la tabla
	$("#btnAddLoc").on('click', function()
	{
		var jsonData = {
				"strDNum_I": $("#inDNumber").val(),
				"strDLocation_I": $("#inNewLoc").val(),
				"action": "echoAddLocation"
		};

		//------------------------------------------------------------------------------------------------------------------
		$.ajax({
				url: "../Model/4-TransactionsDB.php",
				type: "POST",
				data: jsonData,

				success: function(jsonResponse)
				{
					  $("#tbLoc > tr").remove();
						subDisplayLocations();
				}
		});
	});

	//------------------------------------------------------------------------------------------------------------------
	//                                                      //Click en un renglon de la tabla
	$("#btnSaveDept").on('click', function()
	{
		//                                                  //Previene clicks no deseados
		event.preventDefault();
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		//                                                  //Datos que se pasanan del formulario de html a json para
		//                                                  //      llegar al archivo php. En este caso para realizar el
		//                                                  //      delete
		var jsonData3 = {
				"strDNum_I": $("#inDNumber").val(),
				"strDName_I": $("#inDName").val(),
				"strManSSN_I": $("#inManagerSSN :selected").val(),
				"action": "echoSaveDepartment"
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

								subShowNotify(jsonResponse,'success',8000);
						}
						else
						{
								subShowNotify(jsonResponse,'danger',8000);
						}
				},

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
				error: function(errorMessage) {
						subShowNotify(errorMessage,'danger',8000);
				}

				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		});
		});


});
