import { Link } from "solid-app-router";
import { createResource, For } from "solid-js";

const getBoards = () =>
	new Promise((res, rej) => {
		res([
			{
				id: "b",
				title: "Random",
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
			<h2 className="home-title">Welcome back to Bordie, open source imageboard.</h2>
			<For each={boards()} fallback={<div className="loading-text">Loading...</div>}>
				{(board) => (
					<Link class="board-link" href={"/" + board.id}>
						/{board.id}: {board.title}
					</Link>
				)}
			</For>
		</>
	);
}
export default Home;
