$(document).ready(function () {

    $('form').on('submit', function () {
        

        var selected_lang = document.querySelector('input[name="language"]:checked').value;
        var languages = document.getElementsByName('language')
        var lang = []
        for(var i=0; i < languages.length; i++){
            lang[i] = languages[i].value
        }
        
        
        window.location.href="poll_result"
        return false;
    })

})