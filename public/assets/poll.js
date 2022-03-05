$(document).ready(function () {

  
    $('form').on('submit', function () {
        
        var selected_lang = document.querySelector('input[name="language"]:checked').value;
        var languages = document.getElementsByName('language')
        
        var polls_data = $('polls')

        if(polls_data.length == 0 ){

          var no_of_votes = [0, 0, 0, 0, 0]

          for(i = 0; i < languages.length; i++){
         
            if (languages[i].value == selected_lang){
              no_of_votes[i] += 1;
               
            }
              poll_data.push({name: languages[i].value, no_of_votes: no_of_votes[i]})
          } 

          for(poll in poll_data){
            $.ajax({
              type: 'POST',
              url: '/poll',         
              data: poll,         
              success: function(data){         
                //do something with the data via front-end framework
                //window.alert("Hello")  
                     
              }         
            });
          }

        }else{
          
          var updated_poll = {}

          for(poll in poll_data){
            if(poll.name == selected_lang){
              updated_poll = {name: poll.name, no_of_votes: poll.no_of_votes + 1};
            }
          }

          for(poll in poll_data){
            $.ajax({
              type: 'GET',
              url: '/poll/' + updated_poll.name,         
              data: updated_poll,         
              success: function(data){         
                //do something with the data via front-end framework
                //window.alert("Hello")  
                     
              }         
            });

          }
      }
       
     

        window.alert(poll_data[0].name)
        
       
       window.location.href="poll_result"  
       return false;
    })

})