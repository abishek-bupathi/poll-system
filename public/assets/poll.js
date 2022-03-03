const res = require("express/lib/response");

$(document).ready(function () {

    $('form').on('submit', function () {
        
        var selected_lang = document.getElementsById("language").value
      
        window.alert(selected_lang + 'is selected');
      
        
    })

})