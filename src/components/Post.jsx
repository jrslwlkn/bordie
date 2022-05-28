function Post({ id, board, title, text, isOp, isPreview }) {
	return (
		<div
			id={id}
			className={
				"post-container" + (isOp ? " op-post" : "") + (isPreview ? " post-preview" : "")
			}
		>
			<article className="post-text">{text}</article>
		</div>
	);
}

export default Post;
