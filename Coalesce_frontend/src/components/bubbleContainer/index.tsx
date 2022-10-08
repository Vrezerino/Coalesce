import React from 'react';
import Bubble from './bubble';
import './bubbleContainer.css';
import { PublicPostType } from '../../types';

import { useStateValue } from '../../state';

function withHook(_Component: typeof BubbleContainer) {
	return function WrappedComponent() {
		const [{ bubbles }] = useStateValue();
		return <BubbleContainer bubbles={bubbles} />;
	};
}

interface Props {
	bubbles: PublicPostType[]
}

class BubbleContainer extends React.Component<Props> {
	constructor(props: { bubbles: PublicPostType[] }) {
		super(props);
	}
	shouldComponentUpdate(nextProps: { bubbles: PublicPostType[]; }): boolean {
		console.log(this.props.bubbles);
		console.log(nextProps.bubbles);
		return (this.props.bubbles !== (nextProps.bubbles));
	}
	// Each bubble is rendered with a delay, one after another, using the index number.
	render() {
		const bubbles = this.props.bubbles;
		return (
			<div className="bubbles">
				{bubbles?.map((b: PublicPostType, index: number) =>
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