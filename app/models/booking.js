/* ----------------------------------
 * create bokking schema
-------------------------------------*/

var mongoose = require("mongoose"),
	schema = mongoose.Schema;

var bookingSchema = new schema( {

    song: {
		type: schema.Types.ObjectId,
		ref: 'Song'
	},
    user: {
			type: schema.Types.ObjectId,
			ref: 'User'
	}
}, {
    collection: 'booking',
    timestamps: true
});

// Define schema name
module.exports = mongoose.model('Booking', bookingSchema);