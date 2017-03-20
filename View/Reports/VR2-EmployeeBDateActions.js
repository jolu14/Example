//======================================================================================================================
$(document).ready(function()
{
    //==================================================================================================================
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. Inicialmente se debe cargar todos los
    //                                                      //      empleados registrados a la tabla.

    subLoadReport();

    //==================================================================================================================
    function subLoadReport()
    {
        var jsonData =
        {
            "strBDate1_I": $("#inBDate1").val(),
            "strBDate2_I": $("#inBDate2").val(),
            "action": "echoGetEmployeesBDate"
        };

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $.ajax({
            url: "../Model/5-QuerysDB.php",
            type: "POST",
            data: jsonData,

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            success: function(jsonResponse)
            {
                console.log(jsonResponse);
                //                                              //Pasa la informacion a un arreglo entendibel por js y
                //                                              //      adjunta a la tabla.
                var dataArray = jQuery.parseJSON(jsonResponse);

                    for (var x = 0; x < dataArray.length; x++)
                    {
                        console.log(x);
                        $("#tbleEmployeeBDate").append(
                            "<tr id=\"" + dataArray[x][0] + "\"><td>" + dataArray[x][0] +
                            "</td><td>" + dataArray[x][1] +
                            "</td><td>" + dataArray[x][2] +
                            "</td><td>" + dataArray[x][3] +
                            "</td><td>" + dataArray[x][4] +
                            "</td><td>" + dataArray[x][5] +
                            "</td><td>" + dataArray[x][6] +
                            "</td><td>" + dataArray[x][7] +
                            "</td><td>" + dataArray[x][8] +
                            "</td>");
                        }
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });
    }

    //------------------------------------------------------------------------------------------------------------------
    $("#btnLoadBDateReport").unbind().click( function()
    {
        $("#tbleEmployeeBDate > tr").remove();
        subLoadReport();
    });

    //==================================================================================================================
});

//======================================================================================================================
