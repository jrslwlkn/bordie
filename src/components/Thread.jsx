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

function Thread({ id, board }) {
	const [posts] = createResource(id, getPosts);

	return (
		<>
			<div>this is a thread: {id}</div>
			<For each={posts()}>{(post) => <Post {...post} />}</For>
		</>
	);
}

export default Thread;
