import { Link } from "solid-app-router";
import { For } from "solid-js";

function Menu({ items }) {
	return (
		<div className="main-menu-container">
			<For each={items}>
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
