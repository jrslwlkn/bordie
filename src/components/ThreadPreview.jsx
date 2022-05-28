import { Link } from "solid-app-router";
import { For } from "solid-js";
import Post from "./Post";

function ThreadPreview({ id, title, text, tail }) {
	return (
		<>
			<Post
				id={id}
				title={
					<Link class="post-title" href={"thread/" + id}>
						{title}
					</Link>
				}
				text={text}
				isOp
			/>

			<For each={tail}>{(post) => <Post {...post} isPreview />}</For>

			<hr />
		</>
	);
}

export default ThreadPreview;
