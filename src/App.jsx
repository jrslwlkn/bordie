import { lazy } from "solid-js";
import { Routes, Route, Router } from "solid-app-router";
import styles from "./App.module.css";

const Home = lazy(() => import("./components/Home"));
const Board = lazy(() => import("./components/Board"));
const Thread = lazy(() => import("./components/Thread"));

function App() {
	return (
		<Router>
			<div class={styles.App}>
				<h1>Welcome to bordie</h1>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:boardId" element={<Board page={1} />} />
					<Route path="/:boardId/:page" element={<Board />} />
					<Route path="/:board/thread/:threadId" element={<Thread />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
