//======================================================================================================================
$(document).ready(function()
{
    //==================================================================================================================
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. Inicialmente se debe cargar todos los
    //                                                      //      empleados registrados a la tabla.

    var jsonData = {
        "action": "echoGetDepartmentTable"
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
                $("#tbDepartment").append(
                    "<tr data-toggle=\"modal\" data-target=\"#ModAddDepartment\" id=\"" + dataArray[x][0] + "\"style=\"cursor: pointer\"><td>" + dataArray[x][0] +
                    "</td><td>" + dataArray[x][1] +
                    "</td><td>" + dataArray[x][2] +
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
    $("#btnAddDepartment").on("click", function()
    {
        //                                                  //Se obtine la inforamcion del html
        $.post("Departments/VD3-AddDepartmentDialogDiv.html", function(data)
        {
            //                                              //Se despliega el modal
            $("#ModAddDepartment").html(data).fadeIn();
        });
    });

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Click en un renglon de la tabla despliega la informacion
    //                                                      //      completa del empleado
    $("#tbDepartment").on('click', 'tr', function(e)
    {
        var id = $(this).attr('id');
        //                                                  //Se obtine la inforamcion del html
        $.when($.post("Departments/VD2-EditDepartmentDialogDiv.html", function(data)
        {
            //                                              //Se despliega el modal
            $("#ModAddDepartment").html(data).fadeIn();


        }).done(function()
        {
            $("#inDNUM").text(id);
        }));

    });

    //==================================================================================================================
});

//======================================================================================================================
