export const addModal = (modal) => (dispatch) => {
  console.log("addmodal called");
  dispatch({ type: "ADD_MODAL", payload: modal });
};

export const removeModal = () => (dispatch) => {
  dispatch({ type: "REMOVE_MODAL", payload: "FUIMLEAGUES" });
};

export const replaceModal = (modal) => (dispatch) => {
  dispatch({ type: "REPLACE_MODAL", payload: modal });
};
