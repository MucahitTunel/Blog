const LoginReducers = (state = false, action) => {
  switch (action.type) {
    case "SIGN IN":
      return !state;
      break;
    default:
      return state;
  }
}

export default LoginReducers;
