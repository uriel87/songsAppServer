
User = require('../../models/user')
Song = require('../../models/song')
Booking = require('../../models/booking')
bcrypt = require('bcryptjs')
const { dateToString } = require('../../helpers/date')
const { getUser, getSong}  = require('../resolvers/merge')


module.exports = {
    bookings: async () => {
        try {
            console.log("in booking query");
            const bookings = await Booking.find();
            console.log("all bookings results in booking query", bookings);
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    _id: booking._doc._id,
                    user: getUser.bind(this, booking._doc.user),
                    song: getSong.bind(this, booking._doc.song),
                    createdAt: dateToString(booking._doc.createdAt),
                    updatedAt: dateToString(booking._doc.updatedAt)
                 }
            }) 
        } catch (err) {
            console.log("error in booking function", err);
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        console.log("args in bookEvent",args );
        const fetchSong = await Song.findById({ _id: args.songId })
        const booking = new Booking({
            user: req.userId,
            song: fetchSong
        })

        const result = await booking.save();
        console.log("result in bookEvent",booking );

        return {
            ...result._doc,
            _id: result._id,
            user: getUser.bind(this, booking._doc.user),
            song: getSong.bind(this, booking._doc.song),
            createdAt: dateToString(result._doc.createdAt),
            updatedAt: dateToString(result._doc.updatedAt)
        }
    },
    cancelBooking: async (args) => {
        try {
            const DeleteBooking = await Booking.findById(args.bookingId).populate('song');
            
            const song = {
                ...DeleteBooking.song._doc,
                _id: DeleteBooking.song.id,
                songsList: getUser.bind(this, DeleteBooking.song._doc)
            
            }
            await Booking.deleteOne({ _id: args.bookingId })
            return song
        } catch (err) {
            console.log("err in cancelBooking",DeleteBooking );
            throw err;
        }
    } 
}