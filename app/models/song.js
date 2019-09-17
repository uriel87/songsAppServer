/* ----------------------------------
 * create song schema
-------------------------------------*/

var mongoose = require("mongoose"),
	schema = mongoose.Schema;

var songSchema = new schema( {

    name: String,
    
    singer: String,

    category: String,
    
    userList: [
		{
			type: schema.Types.ObjectId,
			ref: 'User'
		}
	]
}, {collection: 'songs'});

// Define schema name
module.exports = mongoose.model('Song',songSchema);