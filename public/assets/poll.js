$(document).ready(function () {

  // When submit button is clicked
  $('form').on('submit', function () {

    // Get the selected language name
    var selected_lang = document.querySelector('input[name="language"]:checked').value;
    // Get the list of all languages
    var languages = document.getElementsByName('language')

    // Accessing the polls data send from res.render() through html element
    var polls_db = JSON.parse($('#polls_db').text());
    $('#polls_db').remove();

    // If the polls data is empty i.e. First use
    if (polls_db.length == 0) {

      var new_polls_data = [];

      // Loop runs through all the languages
      for (i = 0; i < languages.length; i++) {
        // Initial value for votes set to 0
        var votes = 0;
        // If this language is selected then votes is set to 1
        if (languages[i].value == selected_lang) {
          votes = 1;
        }
        // Adding the language name and it's votes to a array of data
        new_polls_data.push({ name: languages[i].value, no_of_votes: votes })
      }

      // Writing each language data into MongoDB using ajax post request
      for (i = 0; i < languages.length; i++) {
        $.ajax({
          type: 'POST',
          url: '/poll',
          data: new_polls_data[i],
          success: function (data) {
            // Redirecting to the results page on successfull update
            window.location.href = "poll_result"
          }
        });
      }

    } else {
      // If polls data already exist
      // The selected language name to be updated is sent through ajax post request
      $.ajax({
        type: 'POST',
        url: '/poll/' + selected_lang,
        success: function (data) {
          // Redirecting to the results page on successfull update
          window.location.href = "poll_result"
        }
      });
    }

    // Returning false to prevent browser's default behaviour
    return false;
  })

})