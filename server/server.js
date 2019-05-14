const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const expressGraphQL = require('express-graphql');
// express-session is to create session and session cookies
const session = require('express-session');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const app = express();
const schema = require('./schema/schema');

const MONGO_URI = 'mongodb+srv://shawn:shawn@lyricaldb-dfem0.mongodb.net/test?retryWrites=true';

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, {
	authSource: 'admin',
	retryWrites: true,
	dbName: 'trainer-alpha',
	useCreateIndex: true,
	useNewUrlParser: true
});

const db = mongoose.connection
	.once('open', () => console.log('Connected to MongoLab instance.'))
	.on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'aaabbbccc',
	store: new MongoStore({
		mongooseConnection: db,
		autoReconnect: true
	})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
	schema,
	graphql: true
}));


module.exports = app;