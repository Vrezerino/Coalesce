import React from 'react';
import Bubble from './bubble';
import './bubbleContainer.css';

import { useStateValue } from '../../state';

const BubbleContainer = () => {
	const [{ bubbles }] = useStateValue();
	// Each bubble is rendered with a delay, one after another, using the index number.
	return (
		<div className="bubbles">
			{bubbles.map((b, index) =>
				<Bubble wait={(index + 1) * 35}
					key={b.id}
					title={b.title}
					poster={b.poster}
					content={b.content}
					date={b.date}
					postNumber={b.postNumber}
					admin={b.admin}
					replyPostNumbers={b.replies}
					bubbleObj={b}
				/>)
			}
		</div>
	);
};

export default BubbleContainer;