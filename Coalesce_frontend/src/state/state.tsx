import React, { createContext, useContext, useReducer } from 'react';
import { PostType } from '../types';
import { Action } from './reducer';
import { Socket } from '../../node_modules/socket.io-client/build/socket';

export type State = {
	currentBubble: PostType | null
	bubbles: PostType[]
	replies: PostType[]
	title: string
	poster: string
	content: string
	contentLength: number
	notification: string
	client: Socket | null
};

const initialState: State = {
	currentBubble: null,
	bubbles: [],
	replies: [],
	title: '',
	poster: '',
	content: '',
	contentLength: 0,
	notification: '',
	client: null,
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
	initialState,
	() => initialState
]);

type StateProviderProps = {
	reducer: React.Reducer<State, Action>;
	children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
	reducer,
	children
}: StateProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
