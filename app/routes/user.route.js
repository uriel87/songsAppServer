var userController = require('../controllers/user.controller');


// products routes
module.exports = function(app) {

    app.post('/getUser', userController.getUser);	// get one user
    
    app.post('/getAllUsers', userController.getAllUsers);	// get all users
    
    app.post('/addOrUpdateUser', userController.addOrUpdateUser);	// add a user

    //app.post('/updateUser', userController.updateUser);	// update a users

};