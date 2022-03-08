$(document).ready(function () {

  $('form').on('submit', function () {

    var selected_lang = document.querySelector('input[name="language"]:checked').value;
    var languages = document.getElementsByName('language')

    var polls_db = JSON.parse($('#polls_db').text());
    $('#polls_db').remove();

    if (polls_db.length == 0) {

      var new_polls_data = [];

      for (i = 0; i < languages.length; i++) {
        var votes = 0;
        if (languages[i].value == selected_lang) {
          votes = 1;
        }
        new_polls_data.push({name: languages[i].value, no_of_votes: votes})
      }

      for (i = 0; i < languages.length; i++) {
        $.ajax({
          type: 'POST',
          url: '/poll',
          data: new_polls_data[i],
          success: function (data) {
            //do something with the data via front-end framework 
            window.location.href = "poll_result"
          }
        });
      }

    } else {
      
      $.ajax({
        type: 'POST',
        url: '/poll/' + selected_lang,
        success: function (data) {
          //do something with the data via front-end framework 
          window.location.href = "poll_result"
        }
      });
    }

    return false;
  })

})