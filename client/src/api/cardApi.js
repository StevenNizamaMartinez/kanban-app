import api from "../libs/api";

export const getCardsRequest = async () => {
  try {
    const data = await api.get("/card");
    return data.data;
  } catch (error) {
    throw error;
  }
}

export const createCardRequest = async (dataCard) => {
  console.log(dataCard);
  try {
    const data = await api.post("/card",dataCard);
    return data.data;
  } catch (error) {
    throw error;
  }
}

export const updateCardPositionRequest = async (cards) => {
  try {
    const data = await api.put(`/card/`,cards);
    return data.data;
  } catch (error) {
    throw error;
  }
}

export const updateCardRequest = async (card) => {
  console.log(card.content);
  try {
    const data = await api.put(`/card/${card.id}`,{content: card.content});
    return data.data;
  } catch (error) {
    throw error;
  }
}

export const deleteCardRequest = async (id) => {
  try {
    const data = await api.delete(`/card/${id}`);
    return data.data;
  } catch (error) {
    throw error;
  }
}
