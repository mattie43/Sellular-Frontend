const INITIAL_STATE = {
  user: null,
  userProductList: [],
  messages: [],
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { user: null, userProductList: [], messages: [] };
    case "GET_PRODUCTS":
      return { ...state, userProductList: action.payload };
    case "ADD_PRODUCT":
      return {
        ...state,
        userProductList: state.userProductList.concat(action.payload),
      };
    case "GET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: state.messages.concat(action.payload) };
    default:
      return state;
  }
}
