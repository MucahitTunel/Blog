const LogoutReducers = (state = false, action) => {


  switch (action.type) {
    case "SIGN OUT":
      return !state;
      break;
    default:
      return state;
  }
}

export default LogoutReducers;
