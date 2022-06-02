import { createMemo, createResource, createSignal, Show } from "solid-js";
import { getPost as _getPost } from "../api";
import Post from "../components/Post";

const [getCache, setCache] = createSignal({});

const getPost = async (id) => {
	if (getCache()[id] !== undefined) {
		return getCache()[id];
	}
	const value = await _getPost(id);
	setCache({ ...getCache(), id: value });
	return value;
};

const DURATION_MS = 500;
window._lastIn = {};

function useDynamicPost(id) {
	const [_post] = createResource(id, getPost);
	const post = createMemo(() => _post());
	const [shown, _shown] = createSignal(false);

	const open = () => {
		window._lastIn[id] = new Date();

		console.log("open", id);
		_shown(true);
	};

	const close = () => {
		console.log("close init", id);

		setTimeout(() => {
			if (DURATION_MS > new Date() - window._lastIn[id]) return;

			console.log("close run", id);
			_shown(false);
		}, DURATION_MS);
	};

	return (
		<span className="dynamic-post-container" onMouseEnter={open} onMouseLeave={close}>
			<span className="dynamic-post-link">
				{">>"}
				{id}
			</span>
			<span className="dynamic-post">
				<Show when={shown()}>
					<div onMouseEnter={open} onMouseLeave={close}>
						<Post {...post()} />
					</div>
				</Show>
			</span>
		</span>
	);
}

export default useDynamicPost;
