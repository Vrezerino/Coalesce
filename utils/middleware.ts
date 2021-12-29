import * as logger from './logger';
const uuid = require('node-uuid');

export const unknownEndpoint = (_request: any, response: any, next: any) => {
	response.status(404).send({ error: 'unknown endpoint' });
	next();
};

export const errorHandler = (error: any, _request: any, response: any, next: any) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send('malformatted id');
	} else if (error.name === 'ValidationError') {
		return response.status(400).send(error.message.split(/[:,]/ig)[2]);
	}
	next(error);
};

export const assignID = (
	req: { 
		id: any; 
	}, _res: any, 
	next: () => void) => { // ei toimi
	req.id = uuid.v4();
	next();
};