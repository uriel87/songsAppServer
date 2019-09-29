
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const autoheader = req.get('Authorization');
    if(!autoheader) {
        req.isAuth = false;
        return next();
    }
    const token = autoheader.split('')[1];
    // Console.log('token', token)

    if(token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, 'somesupersecretkey');
        // Console.log('decodeToken', decodeToken)
    } catch(err) {
        req.isAuth = false;
        return next();
    }

    if(!decodeToken) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId = decodeToken.userId
}