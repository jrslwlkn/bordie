import { createSignal } from "solid-js";
import PostForm from "../components/PostForm";

function useReply(initialForm) {
	const [getOpen, setOpen] = createSignal(false);
	const [getForm, setForm] = createSignal(initialForm);

	const Button = ({ title, className }) => (
		<button type="button" className={className} onClick={() => setOpen(!getOpen())}>
			{getOpen() ? title + " ^" : title}
		</button>
	);

	const Form = ({ isValid, className, hasTitle, onSubmit }) => (
		<>
			<Show when={getOpen()}>
				<PostForm
					getForm={getForm}
					setForm={(diff = {}) => setForm({ ...getForm(), ...diff })}
					isValid={isValid}
					hasTitle={hasTitle}
					className={className}
					closeForm={() => setOpen(false)}
					onSubmit={onSubmit}
				/>
			</Show>
		</>
	);

	return [Button, Form, getOpen];
}

export default useReply;
