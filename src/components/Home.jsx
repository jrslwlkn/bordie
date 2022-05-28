import { Link } from "solid-app-router";
import { createEffect, createResource, createSignal, For } from "solid-js";

const getBoards = (id, title) =>
	new Promise((res, rej) => {
		res([
			{
				id,
				title,
			},
			{
				id: "a",
				title: "Anime",
			},
			{
				id: "pol",
				title: "Politics",
			},
		]);
	});

function Home(props) {
	const [get_val, set_val] = createSignal("hello");
	// get list of boards
	const [boards] = createResource({ id: "b", title: "Random" }, getBoards);
	createEffect(() => {
		console.log({ props, v: get_val(), boards: boards() });
	});

	return (
		<>
			<h3>this is Home</h3>
			<For each={boards()} fallback={<div>Loading...</div>}>
				{(board) => (
					<div>
						<Link href={"/" + board.id}>{board.title}</Link>
					</div>
				)}
			</For>
		</>
	);
}
export default Home;
