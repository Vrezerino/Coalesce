import axios from 'axios';
import { PostType, NewPostType } from '../types';

const url = '/api/posts';

const getAll = async () => {
	const response = await axios.get<PostType[]>(url);
	return response.data;
};

const getBubbles = async () => {
	const response = await axios.get<PostType[]>(url + '/bubbles');
	return response.data;
};

const getReplies = async (array: Array<number>) => {
	const response = await axios.get<PostType[]>(url + '/replies', { params: { array } });
	return response.data;
};

const postPost = async (bubblePostNum: number | null, post: NewPostType) => {
	const response = await axios.post(url + '/' + bubblePostNum, post);
	return response.data;
};

const exportedObject = { getAll, getBubbles, getReplies, postPost };

export default exportedObject;