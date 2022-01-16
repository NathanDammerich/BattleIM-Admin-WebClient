const teamsReducer = (teams = [], action) => {
  switch (action.type) {
    case "FETCH_TEAMS":
      return action.payload;
    default:
      return teams;
  }
};

export default teamsReducer;
