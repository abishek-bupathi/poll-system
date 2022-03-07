$(document).ready(function () {


  $('form').on('submit', function () {

    var selected_lang = document.querySelector('input[name="language"]:checked').value;
    var languages = document.getElementsByName('language')

    var polls_db = JSON.parse($('#polls_db').text());
    $('#polls_db').remove();

    if (polls_db.length == 0) {

      var new_polls_data = [];
      var no_of_votes = [0, 0, 0, 0, 0]

      for (i = 0; i < languages.length; i++) {
        if (languages[i].value == selected_lang) {
          no_of_votes[i] = 1;
        }
        new_polls_data.push({ name: languages[i].value, no_of_votes: no_of_votes[i] })
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
      var updated_poll_item_name = ""
      var update_poll_item_votes = 0

      for (i = 0; i < polls_db.length; i++) {
        if (polls_db[i].name == selected_lang) {
          updated_poll_item_name = polls_db[i].name;
          update_poll_item_votes = polls_db[i].no_of_votes + 1
          break;
        }
      }

      $.ajax({
        type: 'POST',
        url: '/poll/' + updated_poll_item_name + "/" + update_poll_item_votes,
        success: function (data) {
          //do something with the data via front-end framework 
          window.location.href = "poll_result"
        }
      });
    }

    return false;
  })

})