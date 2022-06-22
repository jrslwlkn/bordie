import { useParams } from "solid-app-router";
import { createResource, For } from "solid-js";
import { Title } from "solid-meta";
import { getBoard, postOp } from "../api";
import useReply from "../hooks/use-reply";
import ThreadPreview from "./ThreadPreview";

function Board(props) {
	// TODO: add pagination
	const { page } = useParams();
	const id = () => useParams().boardId;
	const [threads] = createResource(id, () => getBoard(id(), page));
	const [Button, OpForm, isOpen] = useReply({ title: "", text: "" });
	const title = () => "/" + id() + " - Bordie";
	// FIXME: clear/ask user to submit form on board change

	return (
		<div className="board-container">
			<Title>{title()}</Title>
			<h2 className="board-title">/{id()}</h2>
			<small className="board-page">Page {page || 1}</small>

			<Button title="Add a thread" className="btn-primary" />
			<OpForm
				isValid={({ title, text }) => title.length && text.length}
				hasTitle
				onSubmit={async (form) => await postOp(id, form)}
			/>

			<For each={threads()} fallback={<div>Loading threads...</div>}>
				{(thread) => <ThreadPreview {...thread} />}
			</For>
		</div>
	);
}

export default Board;
