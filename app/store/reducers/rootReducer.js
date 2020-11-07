const INITIAL_STATE = {
  user: null,
  userProductList: [],
  messages: [],
  conversations: [],
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { user: null, userProductList: [], messages: [] };
    case "GET_PRODUCTS":
      return { ...state, userProductList: action.payload };
    case "UPDATE_PRODUCT":
      let temp = state.userProductList;
      let index = temp.findIndex((product) => product.id === action.payload);
      temp[index].sold = true;
      return {
        ...state,
        userProductList: temp,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        userProductList: state.userProductList.concat(action.payload),
      };
    case "GET_CONVERSATIONS":
      return { ...state, conversations: action.payload };
    case "ADD_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.concat(action.payload),
      };
    case "DELETE_CONVERSATION":
      return {
        ...state,
        conversations: state.conversations.filter(
          (conversationObj) =>
            conversationObj.conversation.id !== action.payload
        ),
      };
    case "GET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: state.messages.concat(action.payload) };
    default:
      return state;
  }
}
