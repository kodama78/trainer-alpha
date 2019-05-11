const express = require('express');
const mongoose = require('mongoose');

const app = express();

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

module.exports = app;