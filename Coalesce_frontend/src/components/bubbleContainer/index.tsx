import React from 'react';
import Bubble from './bubble';
import './bubbleContainer.css';
import { PostType } from '../../types';

import { useStateValue } from '../../state';

function withHook(_Component: typeof BubbleContainer) {
	return function WrappedComponent() {
		const [{ bubbles }] = useStateValue();
		return <BubbleContainer bubbles={bubbles} />;
	};
}

class BubbleContainer extends React.Component<{ bubbles: PostType[] }> {
	constructor(props: { bubbles: PostType[] }) {
		super(props);
	}
	shouldComponentUpdate(nextProps: { bubbles: PostType[]; }) {
		return this.props.bubbles != nextProps.bubbles;
	}
	// Each bubble is rendered with a delay, one after another, using the index number.
	render() {
		const bubbles = this.props.bubbles;
		return (
			<div className="bubbles">
				{bubbles?.map((b: PostType, index: number) =>
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

export default withHook(BubbleContainer);