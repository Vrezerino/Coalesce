import React, { Dispatch, SetStateAction } from 'react';
import Bubble from './bubble';
import './bubbleContainer.css';
import { PostType } from '../../types';
import { Socket } from 'C:/JS/React apps/Coalesce TypeScript/Coalesce_frontend/node_modules/socket.io-client/build/socket';

import { useStateValue } from '../../state';

interface Props { }

interface State {
	bubbles: PostType[]
}

class BubbleContainer extends React.Component<Props, State> {
	client: Socket;
	replies: PostType[];

	constructor(props: Props | Readonly<Props>) {
		super(props);
		const [{ bubbles, replies, client }] = useStateValue();
		this.state = { bubbles: bubbles }
		this.replies = replies;
		this.client = client!;
	}
	shouldComponentUpdate(nextState: State) {
		return this.state.bubbles != nextState.bubbles;
	}
	// Each bubble is rendered with a delay, one after another, using the index number.
	render() {
		return (
			<div className="bubbles">
				{this.state.bubbles.map((b, index) =>
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
	}
}

export default BubbleContainer;