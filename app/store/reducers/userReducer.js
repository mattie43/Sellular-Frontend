const INITIAL_STATE = {
  user: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { ...state, user: null };
    default:
      return state;
  }
}
