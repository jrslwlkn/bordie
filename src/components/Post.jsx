function Post({ id, board, title, text }) {
	return (
		<div id={id} className="post-container op-post">
			<h4 className="post-title">{title}</h4>
			<article className="post-text">{text}</article>
		</div>
	);
}

export default Post;
