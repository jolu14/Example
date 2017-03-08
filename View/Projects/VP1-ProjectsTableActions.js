//======================================================================================================================
$(document).ready(function()
{
    //==================================================================================================================
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. Inicialmente se debe cargar todos los
    //                                                      //      empleados registrados a la tabla.

    var jsonData = {
        "action": "echoGetProjectTable"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData,

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        success: function(jsonResponse)
        {
            //                                              //Pasa la informacion a un arreglo entendibel por js y lo
            //                                              //      adjunta a la tabla.
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++)
            {
                $("#tbProjects").append(
                    "<tr id=\"" + dataArray[x][0] + "\"style=\"cursor: pointer\"><td>" + dataArray[x][0] +
                    "</td><td>" + dataArray[x][1] +
                    "</td><td>" + dataArray[x][2] +
                    "</td><td>" + dataArray[x][3] +
                    "</td></tr>");
            }
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    });

    //==================================================================================================================
    //                                                      //Muestra un dialogo en la misma pagina para agregar a un
    //                                                      //      empleado. El contenido del dialogo, o definido como
    //                                                      //      Modal por Boostrap, es cargado por otro documento
    //                                                      //      html.
    $("#btnAddProject").on("click", function()
    {
        //                                                  //Se obtine la inforamcion del html
        $.post("Employees/VE3-EmployeeDialogDiv.html", function(data)
        {
            //                                              //Se despliega el modal
            $("#ModAddDepartment").html(data).fadeIn();
        });
    });

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Click en un renglon de la tabla despliega la informacion
    //                                                      //      completa del empleado
    $("#tbProjects").on('click', 'tr', function(e)
    {
        //                                                  //Carga el formulario para mostrar la informacion;
        window.location = 'V1-MainMenuView.html?show=projects&id=' + $(this).attr("id");
    });

    //==================================================================================================================
});

//======================================================================================================================
