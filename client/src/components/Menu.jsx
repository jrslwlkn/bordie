import { Link } from "solid-app-router";
import { createResource, For } from "solid-js";
import { getBoards } from "../api";

function Menu() {
	const [items] = createResource(getBoards);
	return (
		<div className="main-menu-container">
			<For each={items()}>
				{(item) => (
					<Link class="nav-link" href={"/" + item.id}>
						/{item.id}
					</Link>
				)}
			</For>
		</div>
	);
}

export default Menu;
