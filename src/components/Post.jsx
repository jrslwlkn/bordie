function Post({ id, board, title, text, isOp }) {
	return (
		<div id={id} className={"post-container " + (isOp ? "op-post" : "")}>
			<article className="post-text">{text}</article>
		</div>
	);
}

export default Post;
