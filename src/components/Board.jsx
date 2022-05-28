import { Link } from "solid-app-router";
import { createEffect, createResource, For } from "solid-js";

const getThreads = (boardId) =>
	new Promise((res) => {
		res([
			{
				id: 3423,
				title: "Lorem Ipsum",
				text: "some text here",
			},
			{
				id: 3433423,
				title: "Lorem Ipsum - 2",
				text: "some text here again",
			},
		]);
	});

function Board({ id, page }) {
	// TODO: add pagination
	const [threads] = createResource(id, getThreads);

	createEffect(() => {
		console.log({ id, page });
	});

	return (
		<div className="board-container">
			<h2 className="board-title">/{id}</h2>
			<small className="board-page">Page {page}</small>
			<For each={threads()} fallback={<div>Loading threads...</div>}>
				{(thread) => (
					<div className="thread-container">
						<Link class="thread-title" href={"/" + id + "/thread/" + thread.id}>
							{thread.title}
						</Link>
						<article className="thread-body">{thread.text}</article>
					</div>
				)}
			</For>
		</div>
	);
}

export default Board;
