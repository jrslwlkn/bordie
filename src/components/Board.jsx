import { Link } from "solid-app-router";
import { createEffect, createResource, For } from "solid-js";

const getThreads = (boardId) =>
	new Promise((res) => {
		res([
			{
				id: 3423,
				title: "Lorem Ipsum",
				opText: "some text here",
			},
			{
				id: 3433423,
				title: "Lorem Ipsum - 2",
				opText: "some text here again",
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
		<div>
			<h3>Here is the list of threads for page {page}:</h3>
			<For each={threads()} fallback={<div>Loading threads...</div>}>
				{(thread) => (
					<div>
						this is a thread:{" "}
						<Link href={"/" + id + "/thread/" + thread.id}>{thread.title}</Link>
						<pre>{thread.opText}</pre>
					</div>
				)}
			</For>
		</div>
	);
}

export default Board;
