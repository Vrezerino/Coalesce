import React from 'react';
import './post.css';

interface Props {
	id: string;
	admin: boolean;
	poster: string;
	title: string;
	content: string;
	date: Date;
	postNumber: number;
}

const Post = (props: Props) => {
	/*
	const addLike = () => {
		const updatedPost = {
			poster: props.poster,
			content: props.content
		}

		postService.votePost(props.id, updatedPost).then(r => props.setPosts(props.posts.map(p => p.id === r.id ? r : p)))
	}
	*/

	return (
		<div className='post'>
			<div className={props.admin ? 'admin' : 'poster'}>✢
				<b>{props.poster}</b> ✥
				<span className='postDate'> {props.date}</span>
				{props.admin && <span> ∰</span>}
				<span className='postNumber'>{props.postNumber}</span>
			</div>
			{props.title && <div className='postTitle'>{props.title}</div>}
			<div className='content'>{props.content}</div>
			{/*<b>Likes</b>: <i>{props.likes}</i> <img alt="thumbs up icon" src="thumbsup.png" onClick={addLike}/>*/}
		</div>
	);
};

export default Post;