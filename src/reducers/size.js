
const size = window.innerWidth;

const WidthReducers = (state = size, action) => {
  console.log(state);
  switch (action.type) {
    case "WIDTH":
      return action.payload;
      break;
    default:
      return state;
  }
}

export default WidthReducers;
