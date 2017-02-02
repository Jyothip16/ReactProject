var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
	name: String,
	mobile: { type: String, required: true },
	email: { type: String, required: true },
	address: String,
	created_at: Date,
	updated_at: Date
});

var contactInfo = mongoose.model('contactinfo', contactSchema);

mongoose.connect('mongodb://vinod:saivinod@ds139869.mlab.com:39869/saivinod');

// set our port
var port = process.env.PORT || 8080; 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/app')); 

app.get('/getContact',function(req,res){
	
	contactInfo.find({},function(err,contact){
		res.send(contact); 
	}); 
});

app.put('/updateContact/:_id',function(req,res){
	console.log(req.params._id)
	contactInfo.findById(req.params._id, function(err, contact) {
		if (err) res.send('Invalid data! Error!');
  // change the contact info
  contact.name = req.body.name;
  contact.mobile = req.body.mobile;
  contact.email = req.body.email;
  contact.address = req.body.address;
  // save the user
  contact.save(function(err) {
  	if (err) res.send('Invalid data! Error!');
  	res.send('Record Updated!');
  });

});
});


app.post('/addContact',function(req,res){
    // create a new user
   var newUser = contactInfo(req.body);
    // save the user
    newUser.save(function(err) {
     if (err) res.send('Invalid Data..');
     res.send('Record Added!');
    });
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
