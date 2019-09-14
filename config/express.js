var express = require('express'),
	bodyParser = require('body-parser'),
	graphqlHttp = require('express-graphql'),
	{ buildSchema } = require('graphql');

module.exports = function() {

	var app = express();

	app.use('/', express.static('./public'));

	app.use('/graphql', bodyParser.json(),graphqlHttp({
		schema: buildSchema(`

		type Event {
			_id: ID!
			title: String!
			description: String!
			price: Float!
			date: String!
		}

		type rootQuery {
			events: [String!]!
		}

		type rootMutation {
			createEvent(name: String): String
		}

		schema {
			query: rootQuery
			mutation: rootMutation
		}
		`),
		rootValue: {
			events: () => {
				return ['a','b','c']
			},
			createEvent: (args) => {
				const eventName = args.name;
				return eventName;
			}
		},
		graphiql: true
	}));

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	app.set('Content-Type', 'text/plain');
	app.set("json spaces", 4);
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	// Load the routing files
	//require('../app/routes/foodPruduct.route.js')(app);

	require('../app/routes/user.route.js')(app);

	//require('../app/routes/movie.route.js')(app);

	//require('../app/routes/review.route.js')(app);

	//Return the Express application instance
	return app;

};