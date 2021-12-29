const logger = require('./logger');
const uuid = require('node-uuid');

const unknownEndpoint = (request, response, next) => {
	response.status(404).send({ error: 'unknown endpoint' });
	next();
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send('malformatted id');
	} else if (error.name === 'ValidationError') {
		return response.status(400).send(error.message.split(/[:,]/ig)[2]);
	} 
	next(error);
};

const assignID = (req, res, next) => { // ei toimi
	req.id = uuid.v4();
	next();
};

module.exports = {
	unknownEndpoint,
	errorHandler,
	assignID
};