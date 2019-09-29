
User = require('../../models/user'),
Song = require('../../models/song'),
Booking = require('../../models/booking'),
bcrypt = require('bcryptjs');
const { dateToString } = require('../../helpers/date')



const transforSongs = event => {
    return {
        ...event._doc,
        _id: event.id,
        userList: user.bind(this, song.songsList)
    }
}


const getSongsById = async songIds => {
    try {
        const songs = await Song.find({ _id: { $in: songIds}})
        return songs.map(event => {
            return transforSongs(event);
        });
    } catch (err) {
        throw err;
    }
}


const getUser = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id
        };
    } catch (err) {
        throw err;
    }
}


const getSong = async songIds => {
    try {
        const song = await Song.findById(songIds)
        return {
            ...song._doc,
            _id: song.id,
            name: song.name
        }
    } catch (err) {
        throw err;
    }
}



exports.transforSongs = transforSongs;
exports.getSongsById = getSongsById;
exports.getUser = getUser;
exports.getSong = getSong;