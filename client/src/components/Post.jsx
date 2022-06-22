import { useNavigate } from "solid-app-router";
import { For } from "solid-js";
import { postReply } from "../api";
import useDynamicPost from "../hooks/use-dynamic-post";
import useParsedText from "../hooks/use-parsed-text";
import useReply from "../hooks/use-reply";

function Post({
	id,
	threadId,
	title,
	text,
	isOp,
	datetimecreated,
	picsrelated,
	replies,
	isPreview,
}) {
	const [Button, ReplyForm, isOpen] = useReply({ text: "" });
	const Text = useParsedText(text);
	const navigate = useNavigate();

	return (
		<>
			<div
				id={id}
				className={
					"post-container" + (isOp ? " op-post" : "") + (isPreview ? " post-preview" : "")
				}
			>
				<div className="post-bar">
					<Show when={isOp}>
						<button
							type="button"
							className="btn-small btn-open-thread"
							onClick={() => navigate("thread/" + id)}
						>
							Open
						</button>
					</Show>

					<Button title="Reply" className="btn-small" />
				</div>

				<small className="post-meta">
					#{id} @ {new Date(datetimecreated).toLocaleDateString()}{" "}
					{new Date(datetimecreated).toLocaleTimeString()}
				</small>

				<div className="post-picsrelated">
					<For each={picsrelated || []}>
						{(pic) => (
							<div className="post-pic-container" style={{ overflow: "auto" }}>
								<a href={pic.src} target="_blank">
									{pic.filename}.{pic.type}
								</a>
								<br />
								<span>
									{pic.bytesize}B, {pic.width}x{pic.height}
								</span>
								<br />
								<img src={pic.src} alt={pic.filename} className="post-pic" />
							</div>
						)}
					</For>
				</div>

				<Show when={!!title}>
					<div className="post-title">{title}</div>
				</Show>

				<article className="post-text">{Text}</article>

				<Show when={replies?.length}>
					<div className="post-replies">
						<For each={replies}>
							{(replyId) => <a href={"#" + replyId}>{useDynamicPost(replyId)}</a>}
						</For>
					</div>
				</Show>
			</div>

			<ReplyForm
				isValid={({ text }) => !!text.length}
				hasTitle={false}
				className={isPreview ? " post-preview" : ""}
				onSubmit={async (form) => postReply(threadId, form)}
			/>
		</>
	);
}

export default Post;
