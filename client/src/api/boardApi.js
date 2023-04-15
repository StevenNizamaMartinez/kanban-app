import api from "../libs/api";

export const getBoardsRequest = async () => {
  try {
    const data = await api.get("/board");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const updateBoardRequest = async ({ boardId, board }) => {
  try {
    const data = await api.patch(`/board/${boardId}`, board);
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const createBoardRequest = async () => {
  try {
    const data = await api.post("/board");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBoardRequest = async ({ boardId }) => {
  try {
    const data = await api.delete(`/board/${boardId}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};
