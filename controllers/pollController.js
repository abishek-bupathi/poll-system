var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://abishekb128:mongoabi328@cluster0.g3nrx.mongodb.net/poll-system?retryWrites=true&w=majority');

// Create a scheme - this is like a blueprint
var pollSchema = new mongoose.Schema({
    name: String,
    no_of_votes: Number
});

var Poll = mongoose.model('Poll', pollSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/poll-system', function(req,res){
      // get data from mongodb and pass it to the view
      Poll.find({}, function(err, data){
        if (err) throw err;
        res.render('poll', {polls: data});
      });
    });

    app.post('/poll-system', urlencodedParser, function(req,res){
      // get data from the view and add it to mongodb
      var polls = Poll(req.body).save(function(err,data){
        if (err) throw err;
        res.json(data);
      });
      // data.push(req.body);
    });
  
}