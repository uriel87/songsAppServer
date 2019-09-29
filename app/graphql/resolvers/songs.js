User = require('../../models/user'),
Song = require('../../models/song');

const { dateToString } = require('../../helpers/date')


module.exports = {
    createSong: async (args, req) => {

        // console.log("req",req.isAuth)

        // req.isAuth = true;

        // if(req.isAuth) {
        //     throw new Error("Unauthenticated")
        // }

        console.log("args in createSong", args)
        const song = new Song({
            name: args.songInput.name,
            singer: args.songInput.singer,
            category: args.songInput.category,
            userList: req.userId
        });
    
        let createSong;
        try {
        const songResult = await song.save()
            createSong = { ...songResult._doc, _id: songResult._doc._id.toString()};
            const user = await User.findById(req.userId)
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
    }
}