export const areaReducer = (state = '', {type, payload}) => {
  switch (type) {
    case 'ADD_ADDRESS':
      return payload;

    default:
      return state;
  }
};
