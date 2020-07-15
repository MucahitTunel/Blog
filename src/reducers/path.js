const pathReducer = (state="/", action) => {


  switch (action.type) {
    case "CHANGE":
      state = action.payload;
      return state;
      break;
    default:
      return state;
  }
}

export default pathReducer;
