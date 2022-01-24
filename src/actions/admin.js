import * as api from "../api/index";

export const getAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAdmin(id);

    dispatch({ type: "FETCH_ADMIN", payload: data });
  } catch (error) {
    console.log(error);
  }
};
