
User = require('../../models/user'),
Song = require('../../models/song'),
Booking = require('../../models/booking'),
bcrypt = require('bcryptjs');


// const songs = async songIds => {
//     try {
//         const songs = await Song.find({ _id: { $in: songIds}})
//         songs.map(event => {
//             return {
//                 ...song._doc,
//                 _id: song.id,
//                 userList: user.bind(this, song.songsList)
//             }
//         });
//         return songs;
//     } catch (err) {
//         throw err;
//     }
// }


// const user = userId => {
//     try {
//         const users = User.find(userId)
//         return users.map(user => {
//             return {
//                 ...user._doc,
//                 _id: user.id,
//                 userList: user.bind(this, song.songsList)
//             }
//         });
//     } catch (err) {
//         throw err;
//     }
// }


module.exports = {
    users: async () => {
        try {
            console.log('in grapghQL query getAllUsers');
            const users = await User.find().populate('songsList')
            return users.map(user => {
                return {...user._doc}
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
    booking: async (args) => {
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    _id: booking_doc.id,
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
            userList: ["5d7e64f4bd6e0716bc3f5df6"]
        });
    
        let createSong;
        try {
        const songResult = await song.save()
            createSong = { ...songResult._doc, _id: songResult._doc._id.toString()};
            const user = await User.findById("5d7e64f4bd6e0716bc3f5df6")
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
        const fetchSong = await Song.findById({ _id: args._doc.id })
        const booking = new Booking({
            user: '5d7e64f4bd6e0716bc3f5df6',
            song: fetchSong
        })

        const result = await booking.save();
        return {
            ...booking,
            _id: booking._doc.id,
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString()
        }
    } 
}