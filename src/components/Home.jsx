import { Link } from "solid-app-router";
import { createResource, For } from "solid-js";
import { getBoard } from "../api";

function Home(props) {
	const [boards] = createResource(getBoard);

	return (
		<div className="home-container">
			<h2 className="home-title">Welcome back to Bordie, open source imageboard.</h2>
			<For each={boards()} fallback={<div className="loading-text">Loading...</div>}>
				{(board) => (
					<Link class="board-link" href={"/" + board.id}>
						/{board.id}: {board.title}
					</Link>
				)}
			</For>
		</div>
	);
}
export default Home;
