var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

// Connecting to MongoDB
mongoose.connect('mongodb+srv://abishekb128:mongoabi328@cluster0.g3nrx.mongodb.net/poll?retryWrites=true&w=majority');

// Creating Poll schema to store language name and it's number of votes
var pollSchema = new mongoose.Schema({
  name: String,
  no_of_votes: Number
});

var Poll = mongoose.model('Poll', pollSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

  app.get('/poll', function (req, res) {
    // get data from mongodb and pass it to the view
    Poll.find({}, function (err, data) {
      if (err) throw err;
      res.render('poll', { polls: data });
    });
  });

  // Data from MongoDB sent to poll result page
  app.get('/poll_result', function (req, res) {
    // get data from mongodb and pass it to the view    
    Poll.find({}, function (err, data) {
      if (err) throw err;
      res.render('poll_result', { polls: data });
    });
  });

  // When poll item vote needs to be updated, "poll/selected_lang" post request is recieved from frontend
  app.post('/poll/:selected_lang', urlencodedParser, function (req, res) {
    // Printing the selected language on console for debug purpose
    console.log(req.params.selected_lang)
    // Query with selected language name as the key.
    var selected_lang_query = { name: req.params.selected_lang }

    // Finding the correspoding data using the query to get the exisiting no of votes for that language
    Poll.findOne(selected_lang_query, function (err, data) {
      // Creating a new data with incremented no_of_votes field value
      var updated_poll = { no_of_votes: (data.no_of_votes + 1) }
      // Updating only the no_of_votes field for the corresponding document data with the selected language
      Poll.updateOne(selected_lang_query, updated_poll, function (err, data) {
        if (err) throw err;
        console.log("1 document updated");
        res.json(data)
      });
    })
  });

  // "/poll" post request is used when new data is to be created in the MongoDB
  app.post('/poll', urlencodedParser, function (req, res) {
    // get data from the view and add it to mongodb
    var new_polls = Poll(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

}