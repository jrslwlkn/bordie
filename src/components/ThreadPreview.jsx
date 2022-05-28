import { Link } from "solid-app-router";
import { For } from "solid-js";
import Post from "./Post";

function ThreadPreview({ id, title, text, tail }) {
	return (
		<>
			<div className="thread-container">
				<Link class="thread-title" href={"/" + id + "/thread/" + id}>
					{title}
				</Link>
				<article className="thread-body">{text}</article>
			</div>

			<For each={tail}>{(post) => <Post {...post} isOp={false} />}</For>

			<hr />
		</>
	);
}

export default ThreadPreview;
