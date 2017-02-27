//======================================================================================================================
$(document).ready(function()
{

    //==================================================================================================================
    //														                          //Prepara las configuraciones inicales para la pagina
    //														                          //		cargada. Inicialmente se debe cargar todos los
    //                                                      //      empleados registrados a la tabla.
    var jsonData = {
        "action": "echoGetAllEmployees"
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
                $("#tbEmployee").append(
                    "<tr id=\"" + dataArray[x][0] + "\"style=\"cursor: pointer\"><td>" + dataArray[x][0] +
                    "</td><td>" + dataArray[x][1] +
                    "</td><td>" + dataArray[x][2] +
                    "</td><td>" + dataArray[x][3] +
                    "</td><td>" + dataArray[x][4] +
                    "</td><td>" + dataArray[x][5] +
                    "</td><td>" + dataArray[x][6] +
                    "</td><td>" + dataArray[x][7] +
                    "</td><td>" + dataArray[x][8] +
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
    $("#btnAddUser").on("click", function()
    {
        //                                                  //Se obtine la inforamcion del html
        $.post("Employees/E3-EmployeeDialogView.html", function(data)
        {
            //                                              //Se despliega el modal
            $("#myModalDiv").html(data).fadeIn();
        });
    });

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Click en un renglon de la tabla despliega la informacion
    //                                                      //      completa del empleado
    $("#tbEmployee").on('click', 'tr', function(e)
    {
        //                                                  //Carga el formulario para mostrar la informacion;
        $("#divView").load("Employees/E2-EditEmployeeView.html");
        //                                                  //Establece el id del empleado en un hidden element
        document.getElementById('lblSSN').value = $(this).attr('id');
    });

    //==================================================================================================================
});

//======================================================================================================================
