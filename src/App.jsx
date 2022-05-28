import { lazy } from "solid-js";
import { Routes, Route, useParams } from "solid-app-router";
import "./App.css";
import { MetaProvider, Title } from "solid-meta";

const Home = lazy(() => import("./components/Home"));
const Board = lazy(() => import("./components/Board"));
const Thread = lazy(() => import("./components/Thread"));
const Menu = lazy(() => import("./components/Menu"));

const boards = [{ id: "b" }, { id: "a" }];

function App() {
	return (
		<MetaProvider>
			<Title>Bordie, open source imageboard</Title>
			<div className="main-container">
				<Menu items={boards} />
				<Routes>
					<Route path="/" element={<Home />} />u
					<Route
						path="/:boardId"
						element={<Board />}
						data={() => () => useParams().boardId}
					/>
					<Route path="/:boardId/:page" element={<Board />} />
					<Route path="/:boardId/thread/:threadId" element={<Thread />} />
				</Routes>
			</div>
		</MetaProvider>
	);
}

export default App;
