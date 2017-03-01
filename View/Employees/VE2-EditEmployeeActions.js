//======================================================================================================================
$(document).ready(function() {
    //==================================================================================================================
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. En este caso se carga informacion a
    //                                                      //    diferentes elementos del html.
    var strSSN = getUrlParameter('id');
    var strPNo = "";
    var strDName = "";
    console.log(strSSN);



    var jsonData = {
        "action": "echoGetAllSupervisor"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData,

        //                                                  //Carga todos los supervisores al select box para
        //                                                  //    seleccionar 1 si es necesario.
        success: function(jsonResponse) {
            console.log(jsonResponse);
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++) {
                //                                          //Agrega la opcion y establece el value como el id.
                $("#inSuperSSN").append(
                    "<option value=\"" + dataArray[x][0] + "\">" + dataArray[x][1] + "</option> "
                );
            }
        }
    });


    //------------------------------------------------------------------------------------------------------------------
    var jsonData2 = {
        "action": "echoGetAllDepartment"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData2,

        //                                                  //Carga todos los departamentos al select box para
        //                                                  //    seleccionar 1 si es necesario.
        success: function(jsonResponse) {
            console.log(jsonResponse);
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++) {
                //                                          //Agrega la opcion y establece el value como el id.
                $("#inDNo").append(
                    "<option value=\"" + dataArray[x][0] + "\">" + dataArray[x][1] + "</option> "
                );
            }

        }
    });

    //------------------------------------------------------------------------------------------------------------------
    var jsonDataProjects= {
        "action": "echoGetAllProject"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonDataProjects,

        //                                                  //Carga todos los departamentos al select box para
        //                                                  //    seleccionar 1 si es necesario.
        success: function(jsonResponse) {
            console.log(jsonResponse);
            var dataArray = jQuery.parseJSON(jsonResponse);
            for (var x = 0; x < dataArray.length; x++) {
                //                                          //Agrega la opcion y establece el value como el id.
                $("#inPNo").append(
                    "<option value=\"" + dataArray[x][0] + "\">" + dataArray[x][1] + "</option> "
                );
            }

        }
    });

    //------------------------------------------------------------------------------------------------------------------
    var jsonData1 = {
        "strSSN_I": strSSN,
        "action": "echoGetEmployee"
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $.ajax({
        url: "../Model/5-QuerysDB.php",
        type: "POST",
        data: jsonData1,

        //                                                  //Carga toda la informacion del empleado en los elementos
        //                                                  //    de html deseados la informacion se transfroma en un
        //                                                  //    arreglo entendido por js y procesa su informacio.
        success: function(jsonResponse) {

            var dataArray = jQuery.parseJSON(jsonResponse);
            if(dataArray.length > 0)
            {

            document.getElementById("lblEmployee").innerHTML =
                "Empleado / " + dataArray[0][1] + " " + dataArray[0][2];
            document.getElementById("inSSN").value = dataArray[0][0];
            document.getElementById("inFName").value = dataArray[0][1];
            document.getElementById("inLName").value = dataArray[0][2];
            document.getElementById("inBDate").value = dataArray[0][3];
            document.getElementById("inAddress").value = dataArray[0][4];
            if (dataArray[0][5] == "M") {
                document.getElementById("sex-m").checked = true;
            } else {
                document.getElementById("sex-f").checked = true;
            }
            document.getElementById("inSalary").value = dataArray[0][6];
            document.getElementById("inSuperSSN").value = dataArray[0][7];
            document.getElementById("inDNo").value = dataArray[0][8];
            }
            else
            {
                //window.location = 'V1-MainMenuView.html?show=employees';
            }
        },

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        error: function(errorMessage) {
            window.location = 'V1-MainMenuView.html?show=employees';
        }
    });

    //------------------------------------------------------------------------------------------------------------------

    loadEmployeeDependents(true);

    //------------------------------------------------------------------------------------------------------------------

    loadEmployeeProjects(true);

    //==================================================================================================================
    //														//Estos metodos ejecutan las opciones del menu central,
    //														//		carga la pagina deseada dentro del div.
    $("#btnReturnToTable").unbind().click(function() {
        console.log("btnReturnToTable");
        window.location = 'V1-MainMenuView.html?show=employees';
    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnEditEmployee").unbind().click(function()
    {
        $(".edit").show();

        console.log("btnEditEmployee");
        if ($("#btnUpdateEmployeeDiv").is(":hidden")) {
            $("#btnUpdateEmployeeDiv").toggle();
        }

        if ($("#divBtnEdit").is(":hidden")) {
            $("#divBtnEdit").toggle();
        }

        if (!$("#btnEditEmployee").is(":hidden")) {
            $("#btnEditEmployee").toggle();
        }
        if (!$("#btnDeleteEmployee").is(":hidden")) {
            $("#btnDeleteEmployee").toggle();
        }


        document.getElementById('inSSN').readOnly = false;
        document.getElementById('inFName').readOnly = false;
        document.getElementById('inLName').readOnly = false;
        document.getElementById('inBDate').readOnly = false;
        document.getElementById('inAddress').readOnly = false;
        document.getElementById('inSalary').readOnly = false;

        document.getElementById('sex-m').disabled = false;
        document.getElementById('sex-f').disabled = false;
        document.getElementById('inDNo').disabled = false;
        document.getElementById('inSuperSSN').disabled = false;

    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnUpdateEmployee").unbind().click(function() {
        //$(".edit").hide();
        console.log("btnSaveEmployee");

        if (!$("#btnUpdateEmployeeDiv").is(":hidden")) {
            $("#btnUpdateEmployeeDiv").toggle();
        }

        if (!$("#divBtnEdit").is(":hidden")) {
            $("#divBtnEdit").toggle();
        }

        if ($("#btnEditEmployee").is(":hidden")) {
            $("#btnEditEmployee").toggle();
        }

        if ($("#btnDeleteEmployee").is(":hidden")) {
            $("#btnDeleteEmployee").toggle();
        }

        document.getElementById('inSSN').readOnly = true;
        document.getElementById('inFName').readOnly = true;
        document.getElementById('inLName').readOnly = true;
        document.getElementById('inBDate').readOnly = true;
        document.getElementById('inAddress').readOnly = true;
        document.getElementById('inSalary').readOnly = true;

        document.getElementById('sex-m').disabled = true;
        document.getElementById('sex-f').disabled = true;
        document.getElementById('inDNo').disabled = true;
        document.getElementById('inSuperSSN').disabled = true;

    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnDeleteEmployee").on("click", function() {
        //                                                  //Previene clicks no deseados
        event.preventDefault();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //                                                  //Datos que se pasanan del formulario de html a json para
        //                                                  //      llegar al archivo php. En este caso para realizar el
        //                                                  //      delete
        var jsonData3 = {
            "strSSN_I": strSSN,
            "action": "echoDeleteEmployee"
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
                    $("#divSucces").html(jsonResponse);
                    if ($("#divSucces").is(":hidden"))
                    {
                        $("#divSucces").toggle("slow");
                    }
                }
                else
                {
                    $("#divAlert").html(jsonResponse);
                    if ($("#divAlert").is(":hidden"))
                    {
                        $("#divAlert").toggle("slow");
                    }
                }
            },

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            error: function(errorMessage) {
                $("#divAlert").html(errorMessage);
                if ($("#divAlert").is(":hidden")) {
                    $("#divAlert").toggle("slow");
                }
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });
    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnUpdateEmployee").on("click", function() {
        //                                                  //Previene clicks no deseados
        event.preventDefault();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //                                                  //Datos que se pasanan del formulario de html a json para
        //                                                  //      llegar al archivo php. En este caso para realizar el
        //                                                  //      delete
        var jsonData6 =
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
				"action": "echoUpdateEmployee"
		};

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $.ajax({
            url: "../Model/4-TransactionsDB.php",
            type: "POST",
            data: jsonData6,

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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

                } else
                {
                    $("#divAlert").html(jsonResponse);
                    if ($("#divAlert").is(":hidden")) {
                        $("#divAlert").toggle("slow");
                    }
                }
            },

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            error: function(errorMessage) {
                $("#divAlert").html(errorMessage);
                if ($("#divAlert").is(":hidden")) {
                    $("#divAlert").toggle("slow");
                }
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });
    });

    $("#btnAddProject").on("click", function()
    {

        $("#formAddProject").show();
        $("#btnAssingProject").show();
        $("#divPorjectSucces").hide();

    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnAssingProject").on("click", function() {
        //                                                  //Previene clicks no deseados
        event.preventDefault();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //                                                  //Datos que se pasanan del formulario de html a json para
        //                                                  //      llegar al archivo php. En este caso para realizar el
        //                                                  //      delete
        var jsonData6 =
		{
				"strSSN_I": $("#inSSN").val(),
                "strHours_I": $("#inHours").val(),
				"strPNo_I": $("#inPNo :selected").val(),
				"action": "echoAssingProject"
		};

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $.ajax({
            url: "../Model/4-TransactionsDB.php",
            type: "POST",
            data: jsonData6,

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            success: function(jsonResponse)
            {
                var str = jsonResponse;

                if (str.includes("Success"))
                {
                    $("#divPorjectSucces").html(jsonResponse);
                    if ($("#divPorjectSucces").is(":hidden"))
                    {
                        $("#divPorjectSucces").toggle("slow");
                    }

                    console.log(document.URL  +  ' #tbProjects');
                    $('#tbProjects').load(document.URL  +  ' #tbProjects');
                    loadEmployeeProjects(true);

                    if (!$("#formAddProject").is(":hidden"))
                    {
                        $("#formAddProject").toggle("slow");
                        $("#btnAssingProject").toggle("slow");
                    }


                }
                else
                {
                    $("#divProjectAlert").html(jsonResponse);
                    if ($("#divProjectAlert").is(":hidden")) {
                        $("#divProjectAlert").toggle("slow");
                    }
                }
            },

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            error: function(errorMessage) {
                $("#divProjectAlert").html(errorMessage);
                if ($("#divProjectAlert").is(":hidden")) {
                    $("#divProjectAlert").toggle("slow");
                }
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });
    });

    function loadEmployeeProjects(editMode)
    {

        var jsonData4 = {
            "strSSN_I": strSSN,
            "action": "echoGetProyectsEmployee"
        };

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $.ajax({
            url: "../Model/5-QuerysDB.php",
            type: "POST",
            data: jsonData4,

            success: function(jsonResponse) {

                console.log(jsonResponse);
                var dataArray = jQuery.parseJSON(jsonResponse);
                for (var x = 0; x < dataArray.length; x++) {
                    $("#tbProjects").append(
                        "<tr id1=\"" + dataArray[x][3] + "\"id2=\"" + dataArray[x][4] + "\"style=\"cursor: pointer\"><td hidden=\"true\" class=\"edit\"><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\"><button class=\" btn " +
                        "btn-danger btn-xs\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" ><span " +
                        "class=\"glyphicon glyphicon-trash\"></span></button></p></td>" +
                        "</td><td>" + dataArray[x][0] +
                        "</td><td>" + dataArray[x][1] +
                        "</td><td>" + dataArray[x][2] +
                        "</td><td>" + dataArray[x][5] +
                        "</td></tr>");
                }

                if (editMode)
                {
                    $(".edit").show();
                }

            }
        });
    }

    function loadEmployeeDependents(boolEditMode)
    {
        var jsonData5 = {
            "strSSN_I": strSSN,
            "action": "echoGetDependentEmployee"
        };

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $.ajax({
            url: "../Model/5-QuerysDB.php",
            type: "POST",
            data: jsonData5,

            success: function(jsonResponse) {

                console.log(jsonResponse);
                var dataArray = jQuery.parseJSON(jsonResponse);
                for (var x = 0; x < dataArray.length; x++) {
                    $("#tbDependent").append(
                        "<tr id1=\"" + dataArray[x][0] + "\" style=\"cursor: pointer\"><td hidden=\"true\" class=\"edit\"><p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\"><button class=\" btn " +
                        "btn-danger btn-xs \" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#deleteDep\" ><span " +
                        "class=\"glyphicon glyphicon-trash\"></span></button></p></td>" +
                        "</td><td>" + dataArray[x][0] +
                        "</td><td>" + dataArray[x][1] +
                        "</td><td>" + dataArray[x][2] +
                        "</td><td>" + dataArray[x][3] +
                        "</td></tr>");
                }

                if (boolEditMode)
                {
                    $(".edit").show();
                }

            }
        });
    }

    function deleteEmployeeProject(ssn, pno)
    {
        //                                                  //Previene clicks no deseados
        event.preventDefault();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //                                                  //Datos que se pasanan del formulario de html a json para
        //                                                  //      llegar al archivo php. En este caso para realizar el
        //                                                  //      delete
        var jsonData3 = {
            "strSSN_I": strSSN,
            "strPNO_I": pno,
            "action": "echoDeleteEmployeeProject"
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
                    $("#divDelePe").html(jsonResponse);
                    if ($("#divDelePe").is(":hidden"))
                    {
                        $("#divDelePe").toggle("slow");
                    }
                    strPNo ="";
                }
                else
                {
                    $("#divDelePe").html(jsonResponse);
                    if ($("#divDelePe").is(":hidden"))
                    {
                        $("#divDelePe").toggle("slow");
                    }
                }

            },

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            error: function(errorMessage) {
                $("#divDelePe").html(errorMessage);
                if ($("#divDelePe").is(":hidden")) {
                    $("#divDelePe").toggle("slow");
                }
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });
    }

    function deleteEmployeeDependent(strSSN, strDName)
    {
        //                                                  //Previene clicks no deseados
        event.preventDefault();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //                                                  //Datos que se pasanan del formulario de html a json para
        //                                                  //      llegar al archivo php. En este caso para realizar el
        //                                                  //      delete
        var jsonData3 = {
            "strSSN_I": strSSN,
            "strDName_I": strDName,
            "action": "echoDeleteEmployeeDependent"
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
                    $("#divDeleDep").html(jsonResponse);
                    if ($("#divDeleDep").is(":hidden"))
                    {
                        $("#divDeleDep").toggle("slow");
                    }
                    strDName ="";
                }
                else
                {
                    $("#divDeleDep").html(jsonResponse);
                    if ($("#divDeleDep").is(":hidden"))
                    {
                        $("#divDeleDep").toggle("slow");
                    }
                }

            },

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            error: function(errorMessage) {
                $("#divDeleDep").html(errorMessage);
                if ($("#divDeleDep").is(":hidden")) {
                    $("#divDeleDep").toggle("slow");
                }
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });
    }

    function addDependet()
    {
        //                                                  //Previene clicks no deseados
        event.preventDefault();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //                                                  //Datos que se pasanan del formulario de html a json para
        //                                                  //      llegar al archivo php. En este caso para realizar el
        //                                                  //      delete
        var jsonData3 = {
            "strSSN_I": $("#inSSN").val(),
            "strNameD_I": $("#inNameD").val(),
            "strBDateD_I": $("#inBDateD").val(),
            "strSexD_I": $("input[name=sxd]:checked").val(),
            "strRelationshipD_I": $("#inRelationshipD").val(),
            "action": "echoAddEmployeeDependent"
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
                    $("#divAddDepSucces").html(jsonResponse);
                    if ($("#divAddDepSucces").is(":hidden"))
                    {
                        $("#divAddDepSucces").toggle("slow");
                    }

                    if (!$("#formAddDependent").is(":hidden"))
                    {
                        $("#formAddDependent").toggle("slow");
                    }

                }
                else
                {
                    $("#divAddDepAlert").html(jsonResponse);
                    if ($("#divAddDepAlert").is(":hidden"))
                    {
                        $("#divAddDepAlert").toggle("slow");
                    }

                }

            },

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            error: function(errorMessage) {
                $("#divAddDepAlert").html(errorMessage);
                if ($("#divAddDepAlert").is(":hidden")) {
                    $("#divAddDepAlert").toggle("slow");
                }
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });
    }

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Click en un renglon de la tabla
    $("#tbProjects").on('click', 'button', function(e)
    {
        if ($(this).attr('data-title') == "Delete")
        {
            console.log($(this).parents('tr').attr('id1'));
            console.log($(this).parents('tr').attr('id2'));
            strPNo = $(this).parents('tr').attr('id2');
        }
    });

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Click en un renglon de la tabla
    $("#tbDependent").on('click', 'button', function(e)
    {
        if ($(this).attr('data-title') == "Delete")
        {
            console.log($(this).parents('tr').attr('id1'));
            strDName = $(this).parents('tr').attr('id1');
        }
    });

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Click en un renglon de la tabla
    $("#btnDelePe").on('click', function(e)
    {
        $.when(deleteEmployeeProject(strSSN, strPNo)).done(function(){
            $('#tbProjects').load(document.URL  +  ' #tbProjects');
            loadEmployeeProjects(true);
        });

    });

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Click en un renglon de la tabla
    $("#btnDeleDep").on('click', function(e)
    {
        console.log(strSSN);
        console.log(strDName);
        $.when(deleteEmployeeDependent(strSSN, strDName)).done(function(){
            $('#tbDependent').load(document.URL  +  ' #tbDependent');
            loadEmployeeDependents(true);
        });

    });

    //------------------------------------------------------------------------------------------------------------------
    //                                                      //Click en un renglon de la tabla
    $("#btnAddDependent").on('click', function(e)
    {
        $.when(addDependet()).done(function()
        {
            $('#tbDependent').load(document.URL  +  ' #tbDependent');
            loadEmployeeDependents(true);
        });

    });

    //==================================================================================================================
});

//======================================================================================================================
