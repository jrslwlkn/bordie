function PostForm({ getForm, setForm, isValid, hasTitle, className }) {
	const { title, text } = getForm();

	const handleSubmit = async (e) => {
		// TODO
		e.preventDefault();
		console.log({ e });
	};

	return (
		<form className={"new-post op-post " + (className || "")} onSubmit={handleSubmit}>
			<Show when={hasTitle}>
				<input
					className="new-post-title"
					type="text"
					placeholder="Post title"
					value={title}
					onChange={(e) => setForm({ title: e.target.value })}
				/>
			</Show>
			<textarea
				className="new-post-text"
				placeholder="Post text..."
				value={text}
				onChange={(e) => setForm({ text: e.target.value })}
				rows={3}
			/>
			<button type="submit" className="btn-submit" disabled={!isValid(getForm())}>
				Submit
			</button>
		</form>
	);
}

export default PostForm;
