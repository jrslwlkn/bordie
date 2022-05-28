import { useParams } from "solid-app-router";
import { createResource, For } from "solid-js";
import { Title } from "solid-meta";
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


	let isOp = false;
	return (
		<div className="">
			<Title>
				{id} - /{board} - Boardie
			</Title>
			<For each={posts()}>
				{(post) => {
					return (
						<Post
							{...post}
							board={board}
							isPreview={false}
							isOp={post.id === posts()[0].id}
						/>
					);
				}}
			</For>
		</div>
	);
}

export default Thread;
