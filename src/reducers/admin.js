const adminReducer = (admin = [], action) => {
  switch (action.type) {
    case "FETCH_ADMIN":
      return action.payload;
    default:
      return admin;
  }
};

export default adminReducer;
