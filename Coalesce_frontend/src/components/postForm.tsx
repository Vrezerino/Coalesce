import React, { SyntheticEvent } from 'react';
import postService from '../services/postService';
import './postForm.css';
import { NewPostType } from '../types';

import { useStateValue } from '../state';
import { setPoster, setTitle, setContent, setContentLength, setNotification } from '../state';
import axios, { AxiosError } from 'axios';

const PostForm = () => {
	const [
		{
			poster,
			content,
			title,
			contentLength,
			notification,
			currentBubble },
		dispatch
	] = useStateValue();

	const bubblePostNum = currentBubble != null
		? currentBubble.postNumber
		: null;

	const postPost = (event: SyntheticEvent) => {
		event.preventDefault();

		const newPost: NewPostType = {
			poster: poster,
			content: content.trim(),
			title: title,
			replies: [],
			replyTo: bubblePostNum,
			OP: currentBubble ? false : true
			//likes: props.likes
		};

		postService.postPost(bubblePostNum, newPost)
			.then(r => {
				currentBubble?.replies.push(r.postNumber);
				dispatch(setPoster(''));
				dispatch(setContent(''));
				dispatch(setTitle(''));
				dispatch(setContentLength(0));
			})
			.catch((e: Error | AxiosError) => {
				if (axios.isAxiosError(e) && e.response) {
					dispatch(setNotification(e.response.data.toString()));
				} else if (axios.isAxiosError(e) && e.request) {
					dispatch(setNotification('Server didn\'t respond.'));
				} else {
					dispatch(setNotification(e.message));
				}
			});
	};

	React.useEffect(() => {
		const msgTimeOut = setTimeout(() => {
			dispatch(setNotification(''));
		}, 4000);
		return () => clearTimeout(msgTimeOut); // Executed upon component unmount (closing the bubble)
	});

	return (
		<div className='postFormContainer'>
			{/* Toggle post form position etc. depending on whether replying to, or posting a bubble */}
			<div className={bubblePostNum ? '' : 'bubblePostForm'}>
				<form onSubmit={postPost}>
					<table className="form">
						<thead>
							<tr>
								<th>
									<span className='suggestion'>
										{bubblePostNum ? 'Reply' : 'Post bubble'}
									</span>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input
										name='poster'
										value={poster}
										onChange={({ target }) =>
											dispatch(setPoster(target.value))}
										placeholder="Name (optional)" />
								</td>
							</tr>
							{bubblePostNum ? null :
								<tr>
									<td>
										<input
											name='title'
											value={title}
											onChange={({ target }) =>
												dispatch(setTitle(target.value))}
											placeholder="Title (optional)" />
									</td>
								</tr>
							}
							<tr>
								<td>
									<textarea
										name='content'
										autoFocus
										className="content"
										value={content}
										onChange={({ target }) => {
											dispatch(setContent(target.value));
											dispatch(setContentLength((target.value).length));
										}}
										placeholder="Content" maxLength={3000} />
								</td>
							</tr>
							<tr>
								<td>
									<span className="contentLength">
										{contentLength}/3000
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<input disabled accept='image/*' type='file' />
								</td>
							</tr>
							<tr>
								<td>
									<span className="serverMessage">
										{notification}
									</span>
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td>
									<button type="submit">Post</button>
								</td>
							</tr>
						</tfoot>
					</table>
				</form>
			</div>
		</div>
	);
};

export default PostForm;