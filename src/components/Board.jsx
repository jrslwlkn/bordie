import { Link, useParams, useRouteData } from "solid-app-router";
import { createEffect, createResource, createSignal, For, Show } from "solid-js";
import { Title } from "solid-meta";
import PostForm from "./PostForm";

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
	const [getOpen, setOpen] = createSignal(false);
	const [getForm, setForm] = createSignal({ title: "", text: "" });

	createEffect(() => {
		console.log({ threads: threads(), id: id() });
	}, id);

	createEffect(() => {
		console.log(getForm());
	});

	let title = () => "/" + id() + " - Bordie";

	// FIXME: clear/ask user to submit form on board change

	return (
		<div className="board-container">
			<Title>{title()}</Title>
			<h2 className="board-title">/{id()}</h2>
			<small className="board-page">Page {page || 1}</small>
			<button type="button" className="btn-add-thread" onClick={() => setOpen(!getOpen())}>
				[{getOpen() ? "-" : "+"}] Add a thread
			</button>
			<Show when={getOpen()}>
				<PostForm
					getForm={getForm}
					setForm={(diff = {}) => setForm({ ...getForm(), ...diff })}
				/>
			</Show>
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
