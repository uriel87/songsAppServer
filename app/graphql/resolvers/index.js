
User = require('../../models/user'),
Song = require('../../models/song'),
Booking = require('../../models/booking'),
bcrypt = require('bcryptjs');


const getSongsById = async songIds => {
    try {
        const songs = await Song.find({ _id: { $in: songIds}})
        songs.map(event => {
            return {
                ...song._doc,
                _id: song.id,
                userList: user.bind(this, song.songsList)
            }
        });
        return songs;
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


module.exports = {
    users: async () => {
        try {
            console.log('in grapghQL query getAllUsers');
            const users = await User.find().populate('songsList')
            return users.map(user => {
                return {
                    ...user._doc,
                    _id: user._doc.id,
                    createSong: getSong.bind(this, user._doc.songsList)
                }
        })
        } catch (err) {
            console.log(err);
        }
    },
    createUser: async (args) => {
        try {
        const userById = await User.findOne({email: args.userInput.email})
        if(userById) {
            throw new Error("user exsits already")
        }
        const hashPassword = await bcrypt.hash(args.userInput.password,12);

        const user = new User({
            name: args.userInput.name,
            password: hashPassword,
            email: args.userInput.email,
            tel: args.userInput.tel,
        });

        const userResult = await user.save()
        console.log("userResult", userResult)
        return { ...userResult._doc, password: null, _id: userResult.id }
        } catch(err) {
            console.log(err);
            throw err
        }
    },
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
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString()
                 }
            }) 
        } catch (err) {
            console.log("error in booking function", err);
            throw err;
        }
    },
    createSong: async (args) => {
        console.log("args in createSong", args)
        const song = new Song({
            name: args.songInput.name,
            singer: args.songInput.singer,
            category: args.songInput.category,
            userList: "5d80ec21cbd09d2cec5af08c"
        });
    
        let createSong;
        try {
        const songResult = await song.save()
            createSong = { ...songResult._doc, _id: songResult._doc._id.toString()};
            const user = await User.findById("5d80ec21cbd09d2cec5af08c")
            if(!user){
                throw new Error("user not found")
            }
            console.log("if user found", user)
            user.songsList.push(song);
            await user.save();
            return createSong;
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    bookEvent: async (args) => {
        console.log("args in bookEvent",args );
        const fetchSong = await Song.findById({ _id: args.songId })
        const booking = new Booking({
            user: '5d80ec21cbd09d2cec5af08c',
            song: fetchSong
        })

        const result = await booking.save();
        console.log("result in bookEvent",booking );

        return {
            ...result._doc,
            _id: result._id,
            user: getUser.bind(this, booking._doc.user),
            song: getSong.bind(this, booking._doc.song),
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString()
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