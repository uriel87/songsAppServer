const express = require('express'),
	bodyParser = require('body-parser'),
	graphqlHttp = require('express-graphql'),
	graphQlSchema = require('../app/graphql/schema/index'),
	graphQlResolvers = require('../app/graphql/resolvers/index'),
	isAuth = require('../app/middleWre/is-auth');



module.exports = function() {

	var app = express();

	const users = [];

	app.use('/', express.static('./public'));

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	  });

	  app.set('Content-Type', 'text/plain');
	  app.set("json spaces", 4);
	  app.use(bodyParser.json()); // for parsing application/json
	  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	app.use(isAuth);

	app.use('/graphql', bodyParser.json(),graphqlHttp({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true
	}));




	// Load the routing files
	//require('../app/routes/foodPruduct.route.js')(app);

	require('../app/routes/user.route.js')(app);

	//require('../app/routes/movie.route.js')(app);

	//require('../app/routes/review.route.js')(app);

	//Return the Express application instance
	return app;

};