import { useParams } from "solid-app-router";

function Thread(props) {
	const params = useParams();
	return <div>this is a thread: {params.threadId}</div>;
}

export default Thread;
