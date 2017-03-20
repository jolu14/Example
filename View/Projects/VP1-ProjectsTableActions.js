//======================================================================================================================
$(document).ready(function()
{
    //==================================================================================================================
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. Inicialmente se debe cargar todos los
    //                                                      //      empleados registrados a la tabla.

    subLoadProjectTable();
    function subLoadProjectTable(){
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
            console.log(jsonResponse);
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++)
            {
                $("#tbProjects").append(
                    "<tr" + " id=\"" + dataArray[x][0] + "\"" + " pname=\"" + dataArray[x][1] + "\"" +
                     " dnum=\"" + dataArray[x][4] + "\""  + " loc=\"" + dataArray[x][2] + "\"" + "><td>" + dataArray[x][0] +
                    "</td><td>" + dataArray[x][1] +
                    "</td><td>" + dataArray[x][2] +
                    "</td><td>" + dataArray[x][3] +
                    "</td>" + "<td><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\"><button " +
                    "class=\" btn btn-primary btn-xs \" data-toggle=\"modal\" data-target=\"#ModAddProjects\" ><span class=\"glyphicon glyphicon-edit\"></span></button></p" +
                    "></td></tr>");
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
    $("#btnAddProject").on("click", function()
    {
        //                                                  //Se obtine la inforamcion del html
        $.post("Projects/VP3-AddProjectDialogDiv.html", function(data)
        {
            //                                              //Se despliega el modal
            $("#ModAddProjects").html(data).fadeIn();
        });
    });

    //------------------------------------------------------------------------------------------------------------------
  //                                                      //Click en un renglon de la tabla despliega la informacion
  //                                                      //      completa del empleado
  $("#tbProjects").on('click', 'button', function(e)
  {
      var id = $(this).parents('tr').attr('id');
      var PName = $(this).parents('tr').attr('pname');
      var DNum = $(this).parents('tr').attr('dnum');
      var Loc = $(this).parents('tr').attr('loc');
      //                                                  //Se obtine la inforamcion del html
      $.when($.post("Projects/VP2-EditProjectDialogDiv.html", function(data)
      {
          //                                              //Se despliega el modal
          $("#ModAddProjects").html(data).fadeIn();

      }).done(function()
      {
        console.log(id);
        $('#inPNumber').val(id);
        $('#inPNumber').text = id;

        $('#inPName').val(PName);
        $('#inPName').text = PName;

        $('#inPLocation').val(Loc);
        $('#inPLocation').text = Loc;

        console.log(DNum);
        $("#inDNumH").val(DNum);

      }));

  });

  $('#ModAddProjects').on('hidden.bs.modal', function (e) {
    $("#tbProjects > tr").remove();
        subLoadProjectTable();
  });


    //==================================================================================================================
});

//======================================================================================================================
