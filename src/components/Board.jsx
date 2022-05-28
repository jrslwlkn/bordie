import { useParams } from "solid-app-router";
import { createResource, createSignal, For, Show } from "solid-js";
import { Title } from "solid-meta";
import PostForm from "./PostForm";
import ThreadPreview from "./ThreadPreview";

const getThreads = (boardId) =>
	new Promise((res) => {
		res([
			{
				id: 3423,
				title: "Lorem Ipsum",
				text: "some text here",
				tail: [
					{
						id: 23,
						text: "hello 1",
					},
					{
						id: 233,
						text: "hello 2",
					},
					{
						id: 293,
						text: "hello 3",
					},
				],
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
	const id = () => useParams().boardId;
	const [threads] = createResource(id, getThreads);
	const [getOpen, setOpen] = createSignal(false);
	const [getForm, setForm] = createSignal({ title: "", text: "" });

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
				{(thread) => <ThreadPreview {...thread} />}
			</For>
		</div>
	);
}

export default Board;
