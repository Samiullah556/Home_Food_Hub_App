export const authReducer = (
  state = {authenticated: false},
  {type, payload},
) => {
  switch (type) {
    case 'SET_CURRENT_USER':
      return {authenticated: true, user: payload};

    case 'LOGOUT_USER':
      return {authenticated: false, user: {}};
    default:
      return state;
  }
};
