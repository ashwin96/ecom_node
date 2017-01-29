var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	email:{type:String, unique:true, lowercase: true},
	password: String,
	profile:{
		name: {type:String,default:''},
		age: String,
		pic: {type:String} 
	},
	address: String,
	history:{
		data: Date,
		amount: {type:Number,default:0}
	},

});


/**UserSchema.pre('save',function(caller){
	var user = this;
	bcrypt.genSalt(10,function(err,salt){
		if(err) return caller(err);
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err) return caller(err);
			user.password = hash;
			caller();
		});
		
	});
	
		
});**/
UserSchema.pre('save',function(err,next){

var user = this;
var salt = bcrypt.genSalt(10);
var hash = bcrypt.hashSync(user.password,salt);
user.password = hash;
	next();

});

UserSchema.methods.comparePassword=function(password){
	return bcrypt.compareSync(password,this.password);
}


module.exports = mongoose.model("User1",UserSchema);