
const size = window.innerWidth;

const WidthReducers = (state = size, action) => {

  switch (action.type) {
    case "WIDTH":
      return action.payload;
      break;
    default:
      return state;
  }
}

export default WidthReducers;
