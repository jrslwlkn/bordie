import { useNavigate } from "solid-app-router";
import { For } from "solid-js";
import useReply from "../hooks/use-reply";

function Post({ id, title, text, isOp, datetimecreated, picsrelated, replies, isPreview }) {
	const [Button, Form, isOpen] = useReply({ text: "" });
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
							<div style={{ overflow: "auto" }}>
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

				<article className="post-text">{text}</article>
			</div>

			<Form
				isValid={({ text }) => !!text.length}
				hasTitle={false}
				className={isPreview ? " post-preview" : ""}
			/>
		</>
	);
}

export default Post;
