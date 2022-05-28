import { useParams } from "solid-app-router";
import { createResource, For } from "solid-js";
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

	return (
		<div className="">
			<For each={posts()}>{(post) => <Post {...post} board={board} />}</For>
		</div>
	);
}

export default Thread;
