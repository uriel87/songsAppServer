var userSchema = require('mongoose').model('User');

//module.exports = function(app) {

/* ----------------------------------
		get all users function
-------------------------------------*/
exports.getAllUsers = function (req,res) {
	console.log('in controller getAllUsers');
	userSchema.find({},function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getAllUsers, user.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getAllUsers: " + userDoc);
			res.status(200).json(userDoc);
		}
	});
};



/* ----------------------------------
		get user by email function
-------------------------------------*/

exports.getUser = function(req, res) {
	console.log('in controller getUser');

	var query = {
		email: req.body.email
	}

	userSchema.findOne(query,function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getUser, user.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getUser: " + userDoc);
			res.status(200).json(userDoc);
		}
	})

};


/* ----------------------------------
 * add user by email function
 * @param req
 * @param res
 -------------------------------------*/
 exports.addOrUpdateUser = function(req, res) {
	console.log('in controller addOrUpdateUser');

	var userUpdateDetails = {
		name: req.body.name,
		email: req.body.email,
		tel: req.body.tel
	}

	var query = {
		email: req.body.email
	}

	var option = {
		upsert: true,
		new: true,
		runValidators: true
	}

	userSchema.findOneAndUpdate(query, userUpdateDetails, option, function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function addOrUpdateUser, user.controller.js",
				err: err
			});
		}
		else {
			console.log("controller addOrUpdateUser: " + userDoc);
			res.status(200).json(userDoc);
		}
	})

};

//}


