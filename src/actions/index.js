export const change = (data) => {

  return {
    type: 'CHANGE',
    payload: data,
  };
};

export const width = (data) => {

  return {
    type: "WIDTH",
    payload: data,
  }
}

export const mobileHeaderActive = (data) => {
  return {
    type: "ISACTIVE",
    payload: data,
  }
}


export const login = () => {

  console.log("loginnnnnnn");

  return {
    type: "SIGN IN",
  }
}
