$(document).ready(function () {

  
  var submit_btn = document.getElementById("submit")
  submit_btn.addEventListener('click', function(e) {
        
        var selected_lang = document.querySelector('input[name="language"]:checked').value;
        var languages = document.getElementsByName('language')
      
        var polls_db = JSON.parse($('#polls_db').text());
        $('#polls_db').remove();  

        // window.alert(polls_db.length)

        if(polls_db.length == 0){
          
          var new_polls_data = [];
          var no_of_votes = [0, 0, 0, 0, 0]

          for (i = 0; i < languages.length; i++){
            if(languages[i].value == selected_lang){
              no_of_votes[i] = 1;
            }
            new_polls_data.push({name: languages[i].value, no_of_votes: no_of_votes[i]})
          }
          
          for(i = 0; i < languages.length; i++){
            $.ajax({
              type: 'POST', 
              url: '/poll', 
              data: new_polls_data[i], 
              success: function(data){ 
                //do something with the data via front-end framework 
                window.location.reload()
              } 
            });
          }

        }else{
          var updated_poll_item = {name: "Python", no_of_votes: 22}
          for(i = 0 ; i < polls_db.length; i++){
            if(polls_db[i].name == selected_lang){
              updated_poll_item = {name: polls_db[i].name, no_of_votes: (polls_db[i].no_of_votes + 1)}
              break;
            }
          }

          $.ajax({
            type: 'POST',           
            url: '/poll/' + updated_poll_item.name + "/" + updated_poll_item.no_of_votes,            
            data: updated_poll_item,            
            success: function(data){            
              //do something with the data via front-end framework 
              window.location.reload()
            }     
            });
        }
        
      //window.location.reload()
      // window.location.href="poll_result"  
      return false;
    })

})