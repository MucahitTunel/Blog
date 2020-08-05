const LoginReducers = (state = false, action) => {


  switch (action.type) {
    case "SIGN IN":
      if(state===true){
        return state;
        break;
      }else {
        return !state;
        break;
      }

    default:
      return state;
  }
}

export default LoginReducers;
