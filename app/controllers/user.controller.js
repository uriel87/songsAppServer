var userSchema = require('mongoose').model('User');

module.exports = function(app) {

/* ----------------------------------
 * get all users function
 * @param req
 * @param res
-------------------------------------*/
app.getAllUsers = function (req,res) {
	console.log('in controller getAllProduct');
	userSchema.find({},function (err, userDoc) {
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
	});
};



/* ----------------------------------
 * get user by email function
 * @param req
 * @param res
-------------------------------------*/
app.getUser = function(req, res) {
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
 app.addUser = function(req, res) {
	console.log('in controller addUser');

	var newUser = new userSchema({
		name: req.body.name,
		email: req.body.email,
		picture: req.body.picture,
		birthday: req.body.birthday
	})

	var option = {
		upsert: true,
		new: true,
		runValidators: true
	}

	userSchema.findOneAndUpdate({email: req.body.email}, newUser, option, function (err, userDoc) {
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
 * get movie's user function
 * @param req
 * @param res
-------------------------------------*/
app.getMovieUser = function(req, res) {
	console.log('in controller getMovieUser');

	var query = {
		email: req.body.email
	}

	userSchema.distinct("orders.movieId",query,function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: "Database error in function getMovieUser, user.controller.js",
				err: err
			});
		}
		else {

			var aggregate = MovieSchema.aggregate();

			aggregate.match( {id: { $in: userDoc }} );

			var sumReview = {
				_id: {
					id: '$id',
					name: '$name',
					cinema: '$cinema',
					branch: '$branch',
					time: '$time',
					auditorium: '$auditorium'
				}
			}

			aggregate.group(sumReview);

			aggregate.exec(function (err, moviesUserDoc) {
				if(err) {
					console.log(err);
					res.status(200).json({
						status: "404",
						msg: "Database error in function getMovieUser, user.controller.js",
						err: err
					});
				}
				else {
					console.log("controller getMovieUser: " + moviesUserDoc);
					res.status(200).json(moviesUserDoc);
				}
			});
		}
	});
};





/* ----------------------------------
 * push new review
 * @param req
 * @param res
-------------------------------------*/
app.pushReview = function(req, res) {
	console.log('in controller pushReview');

	var commentsArr = ["lame", "wtf", "wow", "nice"];

	if( commentsArr.indexOf(req.body.review) < 0) {
		console.log("Eroor, comment invalid");
		return res.status(200).json("Eroor, comment invalid");
	}

	var query = {
		name: req.body.nameMovie,
	}

	switch(req.body.review) {
	    case "nice":
		    var updateData = {
		   		$inc: { nice: 1},
			    $push:{
					reviews: {
						name: req.body.userName,
						review: req.body.review,
						comment: req.body.comment
					}
			    }
			}
			break;

	    case "wow":
		    var updateData = {
		   		$inc: { wow: 1},
			    $push:{
					reviews: {
						name: req.body.userName,
						review: req.body.review,
						comment: req.body.comment
					}
			    }
			}

			console.log('here')
			break;

	    case "wtf":
		    var updateData = {
		   		$inc: { wtf: 1},
			    $push:{
					reviews: {
						name: req.body.userName,
						review: req.body.review,
						comment: req.body.comment
					}
			    }
			}
			break;

	    case "lame":
		    var updateData = {
		   		$inc: { lame: 1},
			    $push:{
					reviews: {
						name: req.body.userName,
						review: req.body.review,
						comment: req.body.comment
					}
			    }
			}
			break;

	    default:
	        break
	}

	ReviewSchema.findOneAndUpdate(query, updateData, {new: true}, function (err, reviewDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function pushReview, user.controller.js",
				err: err
			});
		}
		else {
				console.log("controller pushReview: " + reviewDoc);
				res.status(200).json(reviewDoc);
		}
	});
};

}