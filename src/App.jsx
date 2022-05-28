import { lazy } from "solid-js";
import { Routes, Route, useParams } from "solid-app-router";
import styles from "./App.module.css";

const Home = lazy(() => import("./components/Home"));
const Board = lazy(() => import("./components/Board"));
const Thread = lazy(() => import("./components/Thread"));

function App() {
	return (
		<div class={styles.App}>
			<h1>Welcome to bordie</h1>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:boardId" element={<Board page={"1"} id={useParams().boardId} />} />
				<Route
					path="/:boardId/:page"
					element={<Board page={useParams().page} id={useParams().boardId} />}
				/>
				<Route
					path="/:boardId/thread/:threadId"
					element={<Thread board={useParams().boardId} id={useParams().threadId} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
