import api from "../libs/api";

export const getListsRequest = async () => {
  try {
    const data = await api.get("/list");
    return data.data;
  } catch (error) {
    throw error;
  }
}

export const createListRequest = async (list) => {
  try {
    const data = await api.post("/list", list);
    return data.data;
  } catch (error) {
    throw error;
  }
}

export const updateListRequest = async ([list,id]) => {
  try {
    const data = await api.put(`/list/${id}`, list);
    return data.data;
  } catch (error) {
    throw error;
  }
}

export const deleteListRequest = async (listId) => {
  try {
    const data = await api.delete(`/list/${listId}`);
    return data.data;
  } catch (error) {
    throw error;
  }
}
