function PostForm({ onSubmit, getForm, setForm, isValid, hasTitle, className, closeForm }) {
	const { title, text } = getForm();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await onSubmit(getForm());
	};

	return (
		<form className={"new-post op-post " + (className || "")} onSubmit={(e) => handleSubmit(e)}>
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
			<div style={{ display: "flex" }}>
				<input type="file" style={{ display: "inline" }} />
				<button
					type="submit"
					className="btn-submit"
					style={{ display: "inline" }}
					disabled={!isValid(getForm())}
				>
					Submit
				</button>
				<button type="button" className="btn-small" onClick={closeForm}>
					<strong>x</strong>
				</button>
			</div>
		</form>
	);
}

export default PostForm;
