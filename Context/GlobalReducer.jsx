const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default globalReducer;
