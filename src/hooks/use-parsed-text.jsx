import { For } from "solid-js";
import useDynamicPost from "./use-dynamic-post";

const REPLY_PATTERN = /\>\>[0-9]+/g;

function useParsedText(original = "") {
	const matches = [...original.matchAll(REPLY_PATTERN)];
	if (!matches.length) {
		return original;
	}
	let prevBound = 0;
	const parts = matches.reduce((arr, cur) => {
		const slice = original.substring(prevBound, cur.index);
		arr.push(slice);
		const [link] = cur;
		const id = Number.parseInt(cur[0].substring(2));
		prevBound = cur.index + link.length;
		arr.push(<a href={"#" + id}>{useDynamicPost(id)}</a>);
		return arr;
	}, []);

	return (
		<>
			<For each={parts}>{(part) => part}</For>
		</>
	);
}

export default useParsedText;
