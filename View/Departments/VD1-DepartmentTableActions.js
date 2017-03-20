//======================================================================================================================
$(document).ready(function()
{
    //==================================================================================================================
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. Inicialmente se debe cargar todos los
    //                                                      //      empleados registrados a la tabla.
subLoadDepartmentTable();
function subLoadDepartmentTable(){
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
            console.log(dataArray);
            for (var x = 0; x < dataArray.length; x++)
            {
                $("#tbDepartment").append(
                    "<tr id=\"" + dataArray[x][0] + "\" name=\"" + dataArray[x][1] + "\" superssn=\"" + dataArray[x][3] + "\" ><td>" + dataArray[x][0] +
                    "</td><td>" + dataArray[x][1] +
                    "</td><td>" + dataArray[x][2] +
                    "</td>" + "<td><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Editar\"><button " +
                    "class=\" btn btn-primary btn-xs \" data-toggle=\"modal\" data-target=\"#ModAddDepartment\" ><span class=\"glyphicon glyphicon-edit\"></span></button></p>" +
                    "</td></tr>");
            }
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    });
  }

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
    $("#tbDepartment").on('click', 'button', function(e)
    {
        var id = $(this).parents('tr').attr('id');
        var name = $(this).parents('tr').attr('name');
        var superssn = $(this).parents('tr').attr('superssn');
        $("#inDNO").val(id);
        //                                                  //Se obtine la inforamcion del html
        $.when($.post("Departments/VD2-EditDepartmentDialogDiv.html", function(data)
        {
            //                                              //Se despliega el modal
            $("#ModAddDepartment").html(data).fadeIn();


        }).done(function()
        {
            $("#inDNumber").val(id);
            $("#inDName").val(name);
            $("#inMSSN").val(superssn);

        }));

    });

    $('#ModAddDepartment').on('hidden.bs.modal', function (e) {
      $("#tbDepartment > tr").remove();
          subLoadDepartmentTable();
    });

    //==================================================================================================================
});

//======================================================================================================================
