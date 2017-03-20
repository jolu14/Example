
//======================================================================================================================
$(document).ready(function()
{
    //==================================================================================================================
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. En este caso muestra la linea de seleccion
    //														//		en el	buton de empleados del menu central	y carga
    //														//		la pagina dentro del div. Se selecciono por default
    //														//		la pagina de empleados.
    var strPageToLoad = getUrlParameter("show");

    if (strPageToLoad == "employees")
    {
        var strIdEmployee= getUrlParameter("id");
        if (strIdEmployee != "null")
        {
            $("#divView").load("Employees/VE2-EditEmployeeDiv.html");
        }
        else
        {
            subShowOne("#divLineEmployee", "#divLineDepartment", "#divLineProjects", "#divLineReports");
            $("#divView").load("Employees/VE1-EmployeeTableDiv.html");
        }
    }
    else if (strPageToLoad == "departments")
    {
        subShowOne("#divLineDepartment", "#divLineEmployee", "#divLineProjects", "#divLineReports");
        $("#divView").load("Departments/VD1-DepartmentTableDiv.html");
    }
    else if (strPageToLoad == "projects")
    {
        subShowOne("#divLineProjects", "#divLineEmployee", "#divLineDepartment", "#divLineReports");
        $("#divView").load("Projects/VP1-ProjectsTableDiv.html");
    }
    else if (strPageToLoad == "report")
    {
        var strId= getUrlParameter("r");

        switch (strId)
        {
            case "VR1":
                $("#divView").load("Reports/VR1-EmployeeSalaryDiv.html");
                break;
            case "VR2":
                $("#divView").load("Reports/VR2-EmployeeBDateDiv.html");
                break;
            default:
        }
    }
    else
    {
        window.location = 'V1-MainMenuView.html?show=employees';
    }

    //==================================================================================================================
    //														//Estos metodos ejecutan las opciones del menu central,
    //														//		carga la pagina deseada dentro del div.
    $("#btnShowEmployees").unbind().click(function() {
        subShowOne("#divLineEmployee", "#divLineDepartment", "#divLineProjects", "#divLineReports");
        window.location = 'V1-MainMenuView.html?show=employees';
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#btnShowDepartments").unbind().click(function() {
        subShowOne("#divLineDepartment", "#divLineEmployee", "#divLineProjects", "#divLineReports");
        window.location = 'V1-MainMenuView.html?show=departments';
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#btnShowProjects").unbind().click(function() {
        subShowOne("#divLineProjects", "#divLineEmployee", "#divLineDepartment", "#divLineReports");
        window.location = 'V1-MainMenuView.html?show=projects';
    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnExit").unbind().click(function()
    {
        //                                                  //Previene clicks no deseados
        event.preventDefault();

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        //                                                  //Datos que se pasanan del formulario de html a json para
        //                                                  //      llegar al archivo php. En este caso para realizar el
        //                                                  //      login
        var jsonData = {
            "action": "echoLogout"
        };

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $.ajax({
            url: "../Controller/1-LoginController.php",
            type: "POST",
            data: jsonData,

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            success: function(jsonResponse)
            {
                window.location = '../index.html';
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        });
    });

    //------------------------------------------------------------------------------------------------------------------
    $("#btnVR1").unbind().click(function() {
        subHideAll("#divLineReports", "#divLineDepartment", "#divLineProjects", "#divLineEmployee");
        window.location = 'V1-MainMenuView.html?show=report&&r=VR1';
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#btnVR2").unbind().click(function() {
        subHideAll("#divLineReports", "#divLineDepartment", "#divLineProjects", "#divLineEmployee");
        window.location = 'V1-MainMenuView.html?show=report&&r=VR2';
    });

    //------------------------------------------------------------------------------------------------------------------
    function subShowOne(strIdToShow_I, strIdToHide1_I, strIdToHide2_I, strIdToHide3_I) {
        $(strIdToShow_I).show("slow");
        $(strIdToHide1_I).hide();
        $(strIdToHide2_I).hide();
        $(strIdToHide3_I).hide();
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function subHideAll(strIdToHide0_I, strIdToHide1_I, strIdToHide2_I, strIdToHide3_I) {
        //$(strIdToHide0_I).hide();
        $(strIdToHide1_I).hide();
        $(strIdToHide2_I).hide();
        $(strIdToHide3_I).hide();
    }

    //==================================================================================================================
});

//======================================================================================================================
