import { useParams } from "solid-app-router";
import { createResource, For } from "solid-js";
import { Title } from "solid-meta";
import { getThread } from "../api";
import useReply from "../hooks/use-reply";
import Post from "./Post";

function Thread(props) {
	const { threadId: id, boardId: board } = useParams();
	const [posts] = createResource(id, getThread);
	const [Button, Form, isOpen] = useReply({ title: "", text: "" });

	return (
		<div className="thread-container">
			<Title>
				{id} - /{board} - Boardie
			</Title>

			<Button title="Reply in thread" className="btn-primary" />
			<Form isValid={({ title, text }) => title.length && text.length} />

			<For each={posts()}>
				{(post) => {
					return <Post {...post} isPreview={false} isOp={post.id === posts()[0].id} />;
				}}
			</For>
		</div>
	);
}

export default Thread;