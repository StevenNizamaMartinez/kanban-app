import api from "../libs/api";

export const loginRequest = async (credentials) => {
  try {
    const data = await api.post("/auth/login", credentials);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerRequest = async (credentials) => {
  try {
    const data = await api.post("/auth/register", credentials);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const logoutRequest = async () => {
  try {
    const data = await api.post("/auth/logout");
    return data.data;
  } catch (error) {
    throw error;
  }
}
