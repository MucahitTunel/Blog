const mobileHeader = (state=false, action) => {


  switch (action.type) {
    case "ISACTIVE":
      state = action.payload;
      return state;
      break;
    default:
      return state;
  }
}

export default mobileHeader;
