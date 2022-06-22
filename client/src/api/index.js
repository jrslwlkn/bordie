const API = "http://localhost:8088";

const get = async (url) => await fetch(url).then((x) => x.json());

const post = async (url, body) =>
	await fetch(url, { method: "POST", body: JSON.stringify(body) }).then((x) => x.json());

export const getBoards = async () => get(API + "/boards");

export const getBoard = async (boardId, page = 1) => get(API + "/board/" + boardId + "/" + page);

export const getThread = async (threadId) => get(API + "/thread/" + threadId);

export const getPost = async (threadId, id) => get(API + "/thread/" + threadId); // FIXME

export const postOp = async (boardId, payload) => post(API + "/board/" + boardId, payload);

export const postReply = async (threadId, payload) => post(API + "/thread/" + threadId, payload); 
