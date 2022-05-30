export const getBoards = async () => {
	return new Promise((res, rej) => {
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
};

export const getBoard = async (boardId, page = 1) => {
	return new Promise((res) => {
		res([
			{
				id: 3423,
				title: boardId + " - Lorem Ipsum",
				text: "some text here",
				tail: [
					{
						id: 23,
						text: "hello 1",
					},
					{
						id: 233,
						text: "hello 2",
					},
					{
						id: 293,
						text: "hello 3",
					},
				],
			},
			{
				id: 3433423,
				title: "Lorem Ipsum - 2",
				text: "some text here again",
			},
		]);
	});
};

export const getThread = async (threadId) => {
	return new Promise((res) => {
		res([
			{
				id: 3423,
				title: "Lorem Ipsum",
				text: "some text here",
			},
			{
				id: 3433423,
				title: "Lorem Ipsum - 2",
				text: "some text here again",
			},
		]);
	});
};
