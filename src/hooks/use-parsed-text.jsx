import { For } from "solid-js";
import useDynamicPost from "./use-dynamic-post";

const REPLY_PATTERN = /\>\>[0-9]+/g;

function useParsedText(original = "") {
	const matches = [...original.matchAll(REPLY_PATTERN)];
	if (!matches.length) {
		return original;
	}

	let prevBound = 0;
	const parts = matches.reduce((arr, cur, i) => {
		const slice = original.substring(prevBound, cur.index);
		arr.push(<span style="white-space: pre-wrap;">{slice}</span>);
		const [link] = cur;
		const id = Number.parseInt(cur[0].substring(2));
		prevBound = cur.index + link.length;
		arr.push(<a href={"#" + id}>{useDynamicPost(id)}</a>);

		if (i === matches.length - 1) {
			const slice2 = original.substring(prevBound);
			arr.push(<span style="white-space: pre-wrap;">{slice2}</span>);
		}

		return arr;
	}, []);

	return (
		<>
			<For each={parts}>{(part) => part}</For>
		</>
	);
}

export default useParsedText;
