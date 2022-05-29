import useReply from "../hooks/use-reply";

function Post({ id, title, text, isOp, isPreview }) {
	const [Button, Form, isOpen] = useReply({ text: "" });

	return (
		<>
			<div
				id={id}
				className={
					"post-container" + (isOp ? " op-post" : "") + (isPreview ? " post-preview" : "")
				}
			>
				<div className="post-bar">
					<Button title="Reply" className="btn-small" />
				</div>

				<Show when={!!title}>
					<div className="post-title">{title}</div>
				</Show>

				<article className="post-text">{text}</article>
			</div>

			<Form
				isValid={({ text }) => !!text.length}
				hasTitle={false}
				className={isPreview ? " post-preview" : ""}
			/>
		</>
	);
}

export default Post;
