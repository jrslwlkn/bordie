function Post({ id, title, text, isOp, isPreview }) {
	return (
		<div
			id={id}
			className={
				"post-container" + (isOp ? " op-post" : "") + (isPreview ? " post-preview" : "")
			}
		>
			<Show when={!!title}>
				<div className="post-title">{title}</div>
			</Show>
			<article className="post-text">{text}</article>
		</div>
	);
}

export default Post;
