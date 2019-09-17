/* ----------------------------------
 * create user schema
-------------------------------------*/

var mongoose = require("mongoose"),
	schema = mongoose.Schema;

var userSchema = new schema( {

	name: String,

	password: String,

	email: { type:String,  unique:true },

	tel: String,

	songsList: [
		{
			type: schema.Types.ObjectId,
			ref: 'Song'
		}
	]

}, {collection: 'users'});

// Define schema name
module.exports = mongoose.model('User',userSchema);