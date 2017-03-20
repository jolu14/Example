//======================================================================================================================
$( window ).load(function()
{
    //------------------------------------------------------------------------------------------------------------------
    $.ajax({
        url: "../Model/2-CheckSessionDB.php",
        success: function(jsonResponse)
        {
            //                                              //If session has started
            if (jsonResponse == "1")
            {
              //setTimeout('window.location.href = "../View/V1-MainMenuView.html"; ');
            }
            //                                              //If session has expired
            else if (jsonResponse == "0")
            {
                setTimeout('window.location.href = "../index.html"; ');
            }
            //                                              //If session hasn't started
            else
            {
                setTimeout('window.location.href = "../index.html"; ');
            }
        }
    });

    //------------------------------------------------------------------------------------------------------------------
});

//======================================================================================================================
