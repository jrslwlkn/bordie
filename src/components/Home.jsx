import { Link } from "solid-app-router";
import { createEffect, createResource, createSignal, For } from "solid-js";

const getBoards = () =>
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
	const [boards] = createResource(getBoards);

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
