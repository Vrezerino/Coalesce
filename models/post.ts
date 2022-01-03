const mongoose = require('mongoose');
const badwords = require('../utils/badwords');
const Counter = require('../models/counter');

import { PostType } from '../types';

const isNotEmpty = (string: string) => string !== '';
const containsNoBadwords = (string: string) => !badwords.array.some((badword: string) => string.toLowerCase().includes(badword));

const validators = [
	{ validator: isNotEmpty, msg: 'No content.' },
	{ validator: containsNoBadwords, msg: 'Watch your language.' }
];

const postSchema = mongoose.Schema({
	OP: Boolean,
	poster: {
		type: String,
		validate: validators[1],
		maxlength: [50, 'Poster name max length is 50.']
	},
	content: {
		type: String,
		validate: validators,
		maxlength: [3000, 'Content max length is 3000.']
	},
	title: {
		type: String,
		validate: validators[1],
		maxlength: [90, 'Title max length is 90.']
	},
	image: {
		data: Buffer,
		type: String
	},
	date: String,
	IP: String,
	replies: Array,
	admin: {
		type: Boolean,
		default: false
	},
	postNumber: Number,
	replyTo: Number
});

postSchema.set('toJSON', {
	transform: (_document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject._v;
	}
});

// Increase postnumber in counter collection's sole document, and insert it into new post.
postSchema.pre('save', async function (this: PostType, next: () => void) {
	// eslint-disable-next-line prefer-const
	let post = this;
	const counter = await Counter.findByIdAndUpdate(
		{ '_id': 'postNumCounter' },
		{ '$inc': { 'currentPostNum': 1 } },
		{ new: true }
	);
	post.postNumber = counter.currentPostNum;
	next();
});

module.exports = mongoose.model('Post', postSchema);