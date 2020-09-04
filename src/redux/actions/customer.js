export const addCustomer = (payload) => {
  return {
    type: 'ADD_CUSTOMER',
    payload,
  };
};

export const removeCustomer = (payload) => {
  return {
    type: 'REMOVE_CUSTOMER',
    payload,
  };
};
