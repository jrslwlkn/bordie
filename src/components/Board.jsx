import { Link, useParams, useRouteData } from "solid-app-router";
import { createEffect, createResource, For } from "solid-js";
import { Title } from "solid-meta";

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

function Board(props) {
	// TODO: add pagination
	const { page } = useParams();
	const id = useRouteData();
	const [threads] = createResource(id, getThreads);

	createEffect(() => {
		console.log({ threads: threads(), id: id() });
	}, id);

	let title = () => "/" + id() + " - Bordie";

	return (
		<div className="board-container">
			<Title>{title()}</Title>
			<h2 className="board-title">/{id()}</h2>
			<small className="board-page">Page {page || 1}</small>
			<For each={threads()} fallback={<div>Loading threads...</div>}>
				{(thread) => (
					<div className="thread-container">
						<Link class="thread-title" href={"/" + id() + "/thread/" + thread.id}>
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
