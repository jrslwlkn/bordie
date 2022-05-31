export const getBoards = async () => {
	return new Promise((res, rej) => {
		res([
			{
				id: "b",
				title: "Random",
				category: "Other",
			},
			{
				id: "a",
				title: "Anime",
				category: "Japanese",
			},
			{
				id: "pol",
				title: "Politics",
				category: "Other",
			},
		]);
	});
};

export const getBoard = async (boardId, page = 1) => {
	return new Promise((res) => {
		res([
			{
				// op
				id: 3423,
				datetimecreated: new Date(),
				title: boardId + " - Lorem Ipsum",
				text: "some text here",
				picsrelated: [
					{
						src: "https://www.purina.co.uk/sites/default/files/2020-12/Understanding%20Your%20Cat%27s%20Body%20LanguageHERO.jpg",
						filename: "cat_in_grass",
						bytesize: 3423423,
						type: "jpg",
						width: 342,
						height: 399,
					},
					{
						src: "https://static.independent.co.uk/2021/06/16/08/newFile-4.jpg",
						filename: "cat",
						type: "jpg",
						bytesize: 3423423,
						type: "jpg",
						width: 342,
						height: 399,
					},
				],
				replies: [1, 3, 3433423],
				tail: [
					{
						id: 23,
						datetimecreated: new Date(),
						text: "hello 1",
						picsrelated: [],
						replies: [],
					},
					{
						id: 233,
						datetimecreated: new Date(),
						text: "hello 2",
						picsrelated: [
							{
								src: "https://www.purina.co.uk/sites/default/files/2020-12/Understanding%20Your%20Cat%27s%20Body%20LanguageHERO.jpg",
								filename: "cat_in_grass",
								bytesize: 3423423,
								type: "jpg",
								width: 342,
								height: 399,
							},
							{
								src: "https://static.independent.co.uk/2021/06/16/08/newFile-4.jpg",
								filename: "cat",
								type: "jpg",
								bytesize: 3423423,
								type: "jpg",
								width: 342,
								height: 399,
							},
						],
						replies: [1, 3, 3433423],
					},
					{
						id: 293,
						datetimecreated: new Date(),
						text: "hello 3",
						picsrelated: [],
						replies: [],
					},
				],
			},
			{
				id: 3433423,
				title: "Lorem Ipsum - 2",
				datetimecreated: new Date(),
				text: "some text here again",
				picsrelated: [],
				replies: [],
			},
		]);
	});
};

export const getThread = async (threadId) => {
	return new Promise((res) => {
		res([
			{
				// op
				bid: "b",
				tid: 34,
				id: 3423,
				datetimecreated: new Date(),
				title: "Lorem Ipsum",
				text: "some text here",
				picsrelated: [
					{
						src: "https://www.purina.co.uk/sites/default/files/2020-12/Understanding%20Your%20Cat%27s%20Body%20LanguageHERO.jpg",
						filename: "cat_in_grass",
						bytesize: 3423423,
						type: "jpg",
						width: 342,
						height: 399,
					},
					{
						src: "https://static.independent.co.uk/2021/06/16/08/newFile-4.jpg",
						filename: "cat",
						type: "jpg",
						bytesize: 3423423,
						type: "jpg",
						width: 342,
						height: 399,
					},
				],
				replies: [1, 3, 3433423],
			},
			{
				// normal post
				id: 3433423,
				datetimecreated: new Date(),
				title: "Lorem Ipsum - 2",
				text: "some text here again",
				picsrelated: [],
				replies: [],
			},
		]);
	});
};
