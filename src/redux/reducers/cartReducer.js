export const cartReducer = (state = {items: []}, {type, payload}) => {
  switch (type) {
    case 'CART_ADD_PRODUCT':
      return {
        items: [...state.items, payload],
      };

    case 'CART_REMOVE_PRODUCT':
      let newCart = state.items.filter((e) => e._id !== payload._id);
      return {
        items: newCart,
      };

    case 'CART_CLEAR':
      return {
        items: [],
      };

    default:
      return state;
  }
};
