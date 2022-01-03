import config = require('./utils/config');
import express = require('express');
const app = express();
//const morgan = require('morgan');
import cors = require('cors');
const postsRouter = require('./controllers/posts');
import middleware = require('./utils/middleware');
import logger = require('./utils/logger');
import mongoose = require('mongoose');
mongoose.set('debug', true);

logger.info('Connecting to', config.DB_URI!);
//morgan.token('body', (req) => JSON.stringify(req.body));
//morgan.token('id', (req) => req.iq);

mongoose.connect(config.DB_URI!, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {
		logger.info('Connected to MongoDB!');
	})
	.catch((error: { message: any; }) => {
		logger.error('Error while connecting to MongoDB:', error.message);
	});

//app.use(morgan(':id :method :url :status - :response-time ms :body'));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use('/api/posts', postsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = {
	app,
	mongoose
};