function PostForm({ getForm, setForm }) {
	const { title, text } = getForm();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log({ e });
	};

	const isSubmittable = () => {
		const { title, text } = getForm();
		return title.length && text.length;
	};

	return (
		<form className="new-post op-post" onSubmit={handleSubmit}>
			<input
				className="new-post-title"
				type="text"
				placeholder="Post title"
				value={title}
				onChange={(e) => setForm({ title: e.target.value })}
			/>
			<textarea
				className="new-post-text"
				placeholder="Post text..."
				value={text}
				onChange={(e) => setForm({ text: e.target.value })}
				rows={3}
			/>
			<button type="submit" className="btn-submit" disabled={!isSubmittable()}>
				Submit
			</button>
		</form>
	);
}

export default PostForm;
