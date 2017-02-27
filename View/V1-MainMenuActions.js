//======================================================================================================================
$(document).ready(function() {
    //------------------------------------------------------------------------------------------------------------------
    //														//Prepara las configuraciones inicales para la pagina
    //														//		cargada. En este caso muestra la linea de seleccion
    //														//		en el	buton de empleados del menu central	y carga
    //														//		la pagina dentro del div. Se selecciono por default
    //														//		la pagina de empleados.
    subShowOne("#divLineEmployee", "#divLineDepartment", "#divLineProjects", "#divLineReports");
    $("#divView").load("Employees/E1-EmployeeTableView.html");

    //------------------------------------------------------------------------------------------------------------------
    //														//Estos metodos ejecutan las opciones del menu central,
    //														//		carga la pagina deseada dentro del div.
    $("#btnShowEmployees").unbind().click(function() {
        subShowOne("#divLineEmployee", "#divLineDepartment", "#divLineProjects", "#divLineReports");
        $("#divView").load("Employees/E1-EmployeeTableView.html");
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#btnShowDepartments").unbind().click(function() {
        subShowOne("#divLineDepartment", "#divLineEmployee", "#divLineProjects", "#divLineReports");
        $("#divView").load("xx");
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#btnShowProjects").unbind().click(function() {
        subShowOne("#divLineProjects", "#divLineEmployee", "#divLineDepartment", "#divLineReports");
        $("#divView").load("xx");
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#btnShowReports").unbind().click(function() {
        subShowOne("#divLineReports", "#divLineEmployee", "#divLineDepartment", "#divLineProjects")
        $("#divView").load("xx");
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function subShowOne(strIdToShow_I, strIdToHide1_I, strIdToHide2_I, strIdToHide3_I) {
        $(strIdToShow_I).show("slow");
        $(strIdToHide1_I).hide();
        $(strIdToHide2_I).hide();
        $(strIdToHide3_I).hide();
    }

    //------------------------------------------------------------------------------------------------------------------
});

//======================================================================================================================
