/* eslint-disable no-unused-vars */
const app = require('./app').app;
const mongoose = require('./app').mongoose;
import http from 'http';
import * as config from './utils/config';
import * as logger from './utils/logger';

import { PostType, NewPostType } from './types';

const db = mongoose.connection;
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);

db.once('open', () => {
	server.listen(config.PORT, () => 
		logger.info(`Server running on port ${config.PORT}`));

	io.on('connection', (socket: { id: string; }) => {
		console.log(`${socket.id} connected!`);
		console.log('Client count:', io.engine.clientsCount);
	});

	io.engine.on('connection_error', (err: { req: string; code: string; message: string; context: string; }) => {
		console.error(err.req);
		console.error(err.code);
		console.error(err.message);
		console.error(err.context);
	});
	
	const pipeline = [ { '$match': { 'operationType': 'insert' } } ];
	//const pipeline = bubbleOpened ? { $match: { OP: false, replyTo: postNumber, postNumber: !null } } : { $match: { OP: true } }
	const options = { fullDocument: 'updateLookup' };
	const posts = db.collection('posts');
	const changeStream = posts.watch(pipeline, options);

	changeStream.on('change', (insertion: { fullDocument: PostType; }) => {
		const post = insertion.fullDocument;
		console.log('Insertion:', post);
		io.sockets.emit(JSON.stringify(post));
	});
});