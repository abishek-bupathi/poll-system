var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://abishekb128:mongoabi328@cluster0.g3nrx.mongodb.net/poll-system?retryWrites=true&w=majority');

// Create a scheme - this is like a blueprint
var pollSchema = new mongoose.Schema({
    name: String,
    no_of_votes: Number
});

var Poll = mongoose.model('Poll', pollSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/poll', function(req,res){
    // get data from mongodb and pass it to the view
    Poll.find({}, function(err, data){
      if (err) throw err;
      res.render('poll', {polls: data});
    });
  });

  app.get('/poll_result', function(req,res){
    // get data from mongodb and pass it to the view    
    Poll.find({}, function(err, data){    
      if (err) throw err;
      res.render('poll_result', {polls: data});
  
    });
  
  });

  app.post('/poll/:name/:votes', urlencodedParser, function(req,res){
    console.log(req.params.name)
    console.log(req.params.votes)
    var my_query = {name: req.params.name}
    var updated_poll = {name: req.params.name, no_of_votes: req.params.votes};
    Poll.updateOne(my_query, updated_poll, function(err, data) {
      if (err) throw err;
      console.log("1 document updated");
      res.json(data)
  
    });

  });
 
  app.post('/poll', urlencodedParser, function(req,res){
    // get data from the view and add it to mongodb
    var new_polls = Poll(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);
    });
  });
  
}