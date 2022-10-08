import { State } from './state';
import { PublicPostType } from '../types';
import { Socket } from '../../node_modules/socket.io-client/build/socket';

export type Action =
	| {
		type: 'SET_CURRENT_BUBBLE';
		payload: PublicPostType;
	}
	| {
		type: 'REMOVE_CURRENT_BUBBLE';
	}
	| {
		type: 'SET_BUBBLES';
		payload: PublicPostType[];
	}
	| {
		type: 'ADD_BUBBLE';
		payload: PublicPostType;
	}
	| {
		type: 'SET_REPLIES';
		payload: PublicPostType[];
	}
	| {
		type: 'ADD_REPLY';
		payload: PublicPostType;
	}
	| {
		type: 'SET_TITLE';
		payload: string;
	}
	| {
		type: 'SET_POSTER';
		payload: string
	}
	| {
		type: 'SET_CONTENT';
		payload: string
	}
	| {
		type: 'SET_CONTENT_LENGTH';
		payload: number
	}
	| {
		type: 'SET_NOTIFICATION';
		payload: string
	}
	| {
		type: 'SET_CLIENT';
		payload: Socket
	};

export const setCurrentBubble = (bubble: PublicPostType) => {
	return {
		type: 'SET_CURRENT_BUBBLE',
		payload: bubble
	} as Action;
};

export const removeCurrentBubble = () => {
	return {
		type: 'REMOVE_CURRENT_BUBBLE',
	} as Action;
};

export const setBubbles = (bubbles: PublicPostType[]) => {
	return {
		type: 'SET_BUBBLES',
		payload: bubbles
	} as Action;
};

export const addBubble = (bubble: PublicPostType) => {
	return {
		type: 'ADD_BUBBLE',
		payload: bubble
	} as Action;
};

export const setReplies = (replies: PublicPostType[]) => {
	return {
		type: 'SET_REPLIES',
		payload: replies
	} as Action;
};

export const addReply = (reply: PublicPostType) => {
	return {
		type: 'ADD_REPLY',
		payload: reply
	} as Action;
};

export const setTitle = (title: string) => {
	return {
		type: 'SET_TITLE',
		payload: title
	} as Action;
};

export const setPoster = (poster: string) => {
	return {
		type: 'SET_POSTER',
		payload: poster
	} as Action;
};

export const setContent = (content: string) => {
	return {
		type: 'SET_CONTENT',
		payload: content
	} as Action;
};

export const setContentLength = (contentLength: number) => {
	return {
		type: 'SET_CONTENT_LENGTH',
		payload: contentLength
	} as Action;
};

export const setNotification = (notif: string) => {
	return {
		type: 'SET_NOTIFICATION',
		payload: notif
	} as Action;
};

export const setClient = (client: Socket) => {
	return {
		type: 'SET_CLIENT',
		payload: client
	} as Action;
};

/* eslint-disable */
export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_CURRENT_BUBBLE':
			return {
				...state,
				currentBubble: action.payload
			};
		case 'REMOVE_CURRENT_BUBBLE':
			return {
				...state,
				currentBubble: null
			};
		case 'SET_REPLIES':
			console.log('setting replies');
			return {
				...state,
				replies: [
					...action.payload,
				]
			};
		case 'SET_BUBBLES':
			console.log('setting bubbles');
			return {
				...state,
				bubbles: [...action.payload]
			};
		case 'ADD_BUBBLE':
			return {
				...state,
				bubbles: [
					...state.bubbles, action.payload
				]
			};
		case 'ADD_REPLY':
			console.log('adding reply');
			return {
				...state,
				replies: [
					...state.replies, action.payload
				]
			};
		case 'SET_TITLE':
			return {
				...state,
				title: action.payload
			};
		case 'SET_POSTER':
			return {
				...state,
				poster: action.payload
			};
		case 'SET_CONTENT':
			return {
				...state,
				content: action.payload
			};
		case 'SET_CONTENT_LENGTH':
			return {
				...state,
				contentLength: action.payload
			};
		case 'SET_NOTIFICATION':
			return {
				...state,
				notification: action.payload
			};
		case 'SET_CLIENT':
			return {
				...state,
				client: action.payload
			};
		default:
			return state;
	}
};
/* eslint-enable */