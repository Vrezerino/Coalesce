import React from 'react';
import Post from './post';
import ReactDOM from 'react-dom';
import './replies.css';
import PostForm from './postForm';

import { useStateValue } from '../state'

interface Props {
	onClose(): void;
}

const Replies = (props: Props) => {
	const replyContainer = React.useRef<HTMLDivElement>(null);
	const [{ currentBubble, replies }] = useStateValue();

	return ReactDOM.createPortal(
		<div className="replies" ref={replyContainer}>
			{currentBubble &&
				<>
					<button className='closeBtn' onClick={props.onClose}>X</button>
					<Post key={currentBubble.id}
						id={currentBubble.id}
						poster={currentBubble.poster}
						content={currentBubble.content}
						date={currentBubble.date}
						postNumber={currentBubble.postNumber}
						admin={currentBubble.admin} title={currentBubble.title} />

					{replies
						? replies.map(r =>
							<Post key={r.id}
								id={r.id}
								title={r.title}
								poster={r.poster}
								content={r.content}
								date={r.date}
								postNumber={r.postNumber}
								admin={r.admin} />)
						: null}

					<PostForm />
				</>
			}
		</div>,
		document.getElementById('root')!
	);
};

export default Replies;