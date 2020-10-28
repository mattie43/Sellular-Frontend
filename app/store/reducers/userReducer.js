const INITIAL_STATE = {
  user: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_IN":
      console.log("logging in");
      break;
    default:
      return state;
  }
}
