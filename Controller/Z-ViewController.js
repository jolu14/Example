//======================================================================================================================

function getUrlParameter(sParam)
{
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }

      return "null";
  }
  //------------------------------------------------------------------------------------------------------------------

    function subShowNotify (message, alert, timeout)
    {
        $(".alert").remove();
        $('<div id="floating_alert" class="alert alert-' + alert + ' fade in"><button type="button" class="close" '+
            'data-dismiss="alert" aria-hidden="true">×</button>' + message + '&nbsp;&nbsp;</div>').appendTo('body');
        setTimeout(function () {
            $(".alert").remove();
            }, timeout);

    }
//======================================================================================================================
