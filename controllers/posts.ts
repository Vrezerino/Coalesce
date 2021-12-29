const postsRouter = require('express').Router();
const Post = require( '../models/post');
import * as config from '../utils/config';

import { PostType, NewPostType } from '../types'
import { AnyKeys, AnyObject } from 'mongoose';

postsRouter.get('/', async (
	_req: any,
	res: {
		json: (arg0: any) => void;
	},
	next: (arg0: any) => void) => {
	try {
		const all = await Post.find({});
		res.json(all.map(p => p.toJSON()));
	} catch (e) {
		next(e);
	}
});

postsRouter.get('/id/:postNumber', ( // Types largely inferred from usage in this file...
	req: {
		params: {
			postNumber: string;
		};
	},
	res: {
		json: (arg0: any) => void;
		status: (arg0: number) => {
			(): any;
			new(): any;
			send: {
				(arg0: string): void;
				new(): any;
			};
		};
	},
	next: (arg0: any) => any) => {
	Post.findOne({ postNumber: parseInt(req.params.postNumber) }).then(post => {
		if (post) {
			res.json(post);
		} else {
			res.status(404).send('404');
		}
	})
		.catch(e => next(e));
});

// Bubbles are thread starters a.k.a original posters. 
postsRouter.get('/bubbles', async (
	_req: any,
	res: {
		json: (arg0: any[]) => void;
	}, next: (arg0: any) => void) => {
	try {
		const allOPs = await Post.find({ OP: true }).exec();
		res.json(allOPs.map(p => p.toJSON()));
	} catch (e) {
		next(e);
	}
});

// Get replies using an array of postnumbers.
postsRouter.get('/replies', async (
	req: {
		query: {
			array: any[];
		};
	},
	res: {
		json: (arg0: any[]) => void;
	},
	next: (arg0: any) => void) => {
	try {
		// Avoiding possible null reply postnumbers.
		const array = req.query.array.flatMap(pnString => pnString === undefined || pnString === null
			? []
			: parseInt(pnString));
		const replies = await Post.find().where('postNumber').in(array).exec();
		res.json(replies.map(reply => reply.toJSON()));
	} catch (e) {
		next(e);
	}
});

postsRouter.post('/:postNumber', async (
	req: {
		body: NewPostType;
		socket: {
			remoteAddress: any;
		};
		params: {
			postNumber: string;
		};
	},
	res: {
		status: (arg0: number) => {
			(): any;
			new(): any;
			send: {
				(arg0: string): void;
				new(): any;
			};
		};
	},
	next: (arg0: any) => void) => {
	const postDate = new Date().toUTCString();
	const post = new Post({
		...req.body,
		poster: req.body.poster
			? (req.body.poster.includes(config.AP) // A secret typed into the poster field 
				? req.body.poster.replace(config.AP, '')
				: req.body.poster)
			: 'NoNamer',
		date: postDate,
		IP: req.socket.remoteAddress,
		admin: req.body.poster.includes(config.AP) ? true : false
	});
	try {
		/*
		req.params.postNumber is the postnumber of the bubble a.k.a thread being replied to.
		If there is nothing to reply to i.e this post is a bubble itself, don't update any post.
		*/
		const isBubble = req.params.postNumber === 'null';
		const savedPost = await post.save();
		if (!isBubble) {
			await Post.findOneAndUpdate(
				{ postNumber: req.params.postNumber },
				{ $push: { replies: savedPost.postNumber } });
		}
		/*
		New post is broadcasted to everyone using changeStream, therefore sending it back to 
		the poster in the HTTP response is redundant. Status code alone suffices.
		*/
		res.status(201).send(JSON.stringify(savedPost));
	} catch (e) {
		next(e);
	}
});

// For development only.
postsRouter.delete('/', async (
	_req: any,
	res: {
		status: (arg0: number) => {
			(): any;
			new(): any;
			end: {
				(): void;
				new():
					any;
			};
		};
	},
	next: (arg0: any) => void) => {
	try {
		await Post.deleteMany({ postNumber: { $gt: 1 } });
		res.status(200).end();
	} catch (e) {
		next(e);
	}
});

export default postsRouter;