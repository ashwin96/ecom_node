var ex = require("express");
var app = ex();
var morgan = require("morgan");
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var User = require('./models/user.js');
var ejs = require('ejs');
var engine = require('ejs-mate');

mongoose.connect('mongodb://one:world@ds047166.mlab.com:47166/ecom',function(err){
	if(err) console.log(err);
	else
		console.log("DB connected successfully");
})


app.use(ex.static( __dirname +'/views'));
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.engine('ejs',engine);
app.set('view engine','ejs');

app.post('/create',function(req,res,next){
	var user = new User();
	user.profile.name = req.body.name;
	user.email = req.body.email;
	user.address = req.body.address;
	user.password = req.body.password;
	user.save(function(err){
		if(err) console.log(err);
		else
		res.json("completed successfully");
	});
});

app.get('/',function(req,res){
	res.render('hello');
});
app.listen(4000,function(err){
	if(err) throw err;
	else
	console.log("Server started successfully ");
});