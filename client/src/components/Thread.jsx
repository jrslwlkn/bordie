import { useParams } from "solid-app-router";
import { createResource, For } from "solid-js";
import { Title } from "solid-meta";
import { getThread, postOp } from "../api";
import useReply from "../hooks/use-reply";
import Post from "./Post";

function Thread(props) {
	const { threadId, boardId } = useParams();
	const [posts] = createResource(threadId, getThread);
	const [Button, ReplyForm, isOpen] = useReply({ text: "" });

	return (
		<div className="thread-container">
			<Title>
				{id} - /{board} - Boardie
			</Title>

			<Button title="Reply in thread" className="btn-primary" />
			<ReplyForm
				isValid={({ text }) => !!text.length}
				hasTitle={false}
				className={isPreview ? " post-preview" : ""}
				onSubmit={async (form) => postReply(threadId, form)}
			/>

			<For each={posts()}>
				{(post) => {
					return <Post {...post} isPreview={false} isOp={post.id === posts()[0].id} />;
				}}
			</For>
		</div>
	);
}

export default Thread;
