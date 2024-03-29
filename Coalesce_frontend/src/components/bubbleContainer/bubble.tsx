import React, { useState } from 'react';
import postService from '../../services/postService';
import './bubble.css';
import { PublicPostType } from '../../types';
//const pop = require('../utils/pop').sound

import { useStateValue } from '../../state';
import { setCurrentBubble, setReplies, setNotification } from '../../state';

interface Props {
	bubbleObj: PublicPostType;
	wait: number;
	postNumber: number;
	replyPostNumbers: number[];
	admin: boolean;
	title: string;
	poster: string;
	content: string;
	date: Date;
}

const Bubble = (props: Props) => {
	const [{ client }, dispatch] = useStateValue();
	const replyPostNumbers = props.replyPostNumbers;
	const bubbleRef = React.useRef<HTMLDivElement>(null);
	const bubbleDiv = (bubbleRef.current as unknown) as HTMLDivElement;
	const [visible, setVisible] = useState(false);

	setTimeout(() => {
		setVisible(true);
	}, props.wait);

	React.useEffect(() => {
		if (bubbleDiv) {
			bubbleDiv.addEventListener('mouseover', () => {
				bubbleDiv.style.width = '92px';
				bubbleDiv.style.height = '92px';
			});

			bubbleDiv.addEventListener('click', () => {
				/*
				* Signal the server that a bubble (thread) has been opened,
				* then get its replies.
				*/
				dispatch(setCurrentBubble(props.bubbleObj));
				client?.send(props.bubbleObj.postNumber);

				if (replyPostNumbers.length !== 0) {
					postService.getReplies(props.bubbleObj.replies)
						.then(r => dispatch(setReplies(Array.from(r))))
						.catch(e => {
							dispatch(setNotification(e.message));
						});
				} else {
					dispatch(setReplies([]));
				}
			});

			bubbleDiv.addEventListener('mouseout', () => {
				bubbleDiv.style.width = '90px';
				bubbleDiv.style.height = '90px';
			});
		}
	}, [props, replyPostNumbers]);

	const position = {
		left: Math.random() * (window.innerWidth - 250),
		top: Math.random() * (window.innerHeight - 250)
	};

	if (!visible) {
		return <div ref={bubbleRef}></div>;
	} else {
		return (
			<div
				ref={bubbleRef}
				className={!props.admin ? 'ball bubble' : 'ball bubble admin'}
				id={props.postNumber.toString()}
				style={{ ...position }} /*alt={props.title || props.content}*/>
				<div className='container'>
					<div className='content'>{props.title || props.content}</div>
				</div>
			</div>
		);
	}
};

export default Bubble;