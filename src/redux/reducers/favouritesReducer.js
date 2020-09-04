import AsyncStorage from '@react-native-community/async-storage';

export const favouritesReducer = (state = {items: []}, {type, payload}) => {
  const setStorage = async (fav) => {
    await AsyncStorage.setItem('fav', JSON.stringify(fav));
  };
  switch (type) {
    case 'ADD_FAV':
      setStorage([...state.items, payload]);
      return {
        items: [...state.items, payload],
      };
    case 'FILL_FAV':
      return {
        items: [...payload],
      };
    case 'DELETE_FAV':
      let filtered = state.items.filter((e) => e._id !== payload);
      setStorage(filtered);
      return {
        items: filtered,
      };

    default:
      return state;
  }
};
