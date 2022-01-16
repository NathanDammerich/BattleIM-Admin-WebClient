const modalReducer = (modals = [], action) => {
  switch (action.type) {
    case "ADD_MODAL":
      return [...modals, action.payload];
    case "REMOVE_MODAL":
      return modals.slice(0, -1);
    case "REPLACE_MODAL":
      const newModals = modals.filter(
        (modal, idx) => idx !== modals.length - 1
      );
      return [...newModals, action.payload];
    default:
      return modals;
  }
};

export default modalReducer;
