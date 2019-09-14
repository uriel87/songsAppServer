/* ----------------------------------
 * create user schema
-------------------------------------*/

var mongoose = require("mongoose"),
	schema = mongoose.Schema;

var userSchema = new schema( {

	name: String,

	email: { type:String,  unique:true },
	
	tel: String,

}, {collection: 'users'});

// Define schema name
mongoose.model('User',userSchema);