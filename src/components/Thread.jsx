import { useParams } from "solid-app-router";
import { createResource, For } from "solid-js";
import { Title } from "solid-meta";
import useReply from "../hooks/use-reply";
import Post from "./Post";

const getPosts = (threadId) =>
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

function Thread(props) {
	const { threadId: id, boardId: board } = useParams();
	const [posts] = createResource(id, getPosts);
	const [Button, Form, isOpen] = useReply({ title: "", text: "" });

	return (
		<div className="">
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
