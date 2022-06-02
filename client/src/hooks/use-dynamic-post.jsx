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
	const [directionStyle, _style] = createSignal({});
	const auxId = +new Date();

	const open = () => {
		window._lastIn[id] = new Date();

		const _el = document.getElementById(auxId);
		const { right, top } = _el.getBoundingClientRect();
		const width = window.innerWidth / 2;
		const height = window.innerHeight / 2;
		const style = {};
		if (right >= width && top <= height) {
			style.top = "20px";
			style.right = 0;
		} else if (right >= width && top >= height) {
			style.bottom = "20px";
			style.right = 0;
		} else if (right <= width && top >= height) {
			style.bottom = "20px";
			style.left = 0;
		} else if (right <= width && top <= height) {
			style.top = "20px";
			style.left = 0;
		}
		_style(style);

		_shown(true);
	};

	const close = () => {
		setTimeout(() => {
			if (DURATION_MS <= new Date() - window._lastIn[id]) {
				_shown(false);
			}
		}, DURATION_MS);
	};

	return (
		<span className="dynamic-post-container" onMouseEnter={open} onMouseLeave={close}>
			<span id={auxId} className="dynamic-post-link">
				{">>"}
				{id}
			</span>
			<Show when={shown()}>
				<div
					className="dynamic-post"
					onMouseEnter={open}
					onMouseLeave={close}
					style={directionStyle()}
				>
					<Post {...post()} />
				</div>
			</Show>
		</span>
	);
}

export default useDynamicPost;
