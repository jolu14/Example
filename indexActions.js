//======================================================================================================================
$(document).ready(function() {

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Se hace el link entre el boton de html y las acciones
    //                                                      //      que este va ejecutar
    $("#btnIngresar").click(function() {
        //                                                  //Previene clicks no deseados
        event.preventDefault();

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //                                                  //Datos que se pasanan del formulario de html a json para
        //                                                  //      llegar al archivo php. En este caso para realizar el
        //                                                  //      login
        var jsonData = {
            "strUserName_I": $("#inUser").val(),
            "strPassword_I": $("#inPassword").val(),
            "action": "echoLogin"
        };

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $.ajax({
            url: "Controller/1-LoginController.php",
            type: "POST",
            data: jsonData,

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            success: function(jsonResponse)
            {
                //                                          //Si se establecio la conecxion con exito pueden ocurrir
                //                                          //      varias cosas. El divAlert mostrara el diagnostico
                //                                          //      que va regresar php si es necesario esto.
                $("#divAlert").html(jsonResponse);
                if ($("#divAlert").is(":hidden")) {
                    $("#divAlert").toggle("slow");
                }

                //                                          //Si regresa 1 todo login se realizo de manera satisfactoria
                //                                          //      e dirijo a la ventana de menu
                if (jsonResponse == "1")
                {
                    window.location = 'View/V1-MainMenuView.html?show=employees';
                }
            },

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            error: function(errorMessage) {
                $("#divAlert").html("<div> <strong>Error!</strong> " + "Desconocid...o" + "</div>");
                $("#divAlert").toggle();
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    });

    //------------------------------------------------------------------------------------------------------------------
});

//======================================================================================================================
