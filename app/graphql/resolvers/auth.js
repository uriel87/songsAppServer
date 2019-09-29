
User = require('../../models/user')
Song = require('../../models/song')
const { getSong }  = require('../resolvers/merge')
const jwt = require('jsonwebtoken');

bcrypt = require('bcryptjs');

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
    createUser: async (args, req) => {
        if(!req.isAuth) {
            throw new Error("Unauthenticated")
        }

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
    // we can use also - login: async ({email, password}) => {
    login: async (args) => {
        // console.log("in login function the args are", args)
        const user = await User.findOne({email: args.email})
        if(!user) {
            throw new Error("User does not exist")
        };
        const isEqual = await bcrypt.compare(args.password, user.password)
        if(!isEqual) {
            throw new Error("invalid credentials")
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenEcpiration: 1
        }
    }
}
