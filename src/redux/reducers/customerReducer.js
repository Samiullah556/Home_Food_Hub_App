export const customerReducer = (state = {loggedIn: false}, {type, payload}) => {
  switch (type) {
    case 'ADD_CUSTOMER':
      return {loggedIn: true, user: payload};

    case 'REMOVE_CUSTOMER':
      return {loggedIn: false};

    default:
      return state;
  }
};
