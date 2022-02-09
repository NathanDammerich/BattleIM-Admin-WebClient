import * as api from "../api/index";

export const getAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAdmin(id);

    dispatch({ type: "FETCH_ADMIN", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);

    dispatch({ type: "SIGN_IN", payload: data.admin });
  } catch (error) {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SIGN_IN_ERROR", payload: true });
  }
};

export const attemptRefresh = () => async (dispatch) => {
  try {
    const { data } = await api.refreshUser();
    dispatch({ type: "SIGN_IN", payload: data.admin });
  } catch (error) {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SIGN_IN_ERROR", payload: true });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.log(error);
  }
};
