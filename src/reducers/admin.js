const adminReducer = (admin = null, action) => {
  switch (action.type) {
    case "FETCH_ADMIN":
      return action.payload;
    case "SIGN_IN":
      return action.payload;
    case "UPDATE_USER":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return admin;
  }
};

export default adminReducer;
