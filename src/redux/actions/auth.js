export const setCurrentUser = (payload) => {
  return {
    type: 'SET_CURRENT_USER',
    payload,
  };
};
export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export const addArea = (payload) => {
  return {
    type: 'ADD_ADDRESS',
    payload,
  };
};

export const addFav = (payload) => {
  return {
    type: 'ADD_FAV',
    payload,
  };
};

export const deleteFav = (payload) => {
  return {
    type: 'DELETE_FAV',
    payload,
  };
};

export const fillFav = (payload) => {
  return {
    type: 'FILL_FAV',
    payload,
  };
};
