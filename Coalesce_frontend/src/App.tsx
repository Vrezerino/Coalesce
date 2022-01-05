import React from 'react';
import postService from './services/postService';
import Replies from './components/replies';
import BubbleContainer from './components/bubbleContainer';
import PostForm from './components/postForm';
import { io } from 'socket.io-client';

import { useStateValue } from './state';
import { setBubbles, removeCurrentBubble, addBubble, addReply } from './state';

const socket = io();

const App = () => {
	const [{ currentBubble }, dispatch] = useStateValue();

	React.useEffect(() => {
		const fetchBubbles = async () => {
			const bubbles = await postService.getBubbles();
			dispatch(setBubbles(bubbles));
		};
		void fetchBubbles();
	}, [dispatch]);

	socket.on('connect', () => {
		//////////
	});

	/* eslint-disable */
	socket.onAny((event: any) => {
		const msgJSON = JSON.parse(event);
		let { IP, ...newPost } = msgJSON; // remove IP field 
		newPost = { ...newPost, id: msgJSON._id };
		if (newPost.OP) {
			dispatch(addBubble(newPost));
		} else {
			dispatch(addReply(newPost));
		}
	});
	/* eslint-enable */

	socket.on('disconnect', (reason) => {
		if (reason === 'io server disconnect') {
			socket.connect();
		}
	});

	return (
		<>
			<BubbleContainer />
			<Replies onClose={() => {
				dispatch(removeCurrentBubble());
				socket.send(0);
			}} />
			{!currentBubble && <PostForm />}
		</>
	);
};

export default App;