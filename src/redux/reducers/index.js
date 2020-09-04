import {combineReducers} from 'redux';
import {cartReducer} from './cartReducer';
import {authReducer} from './authReducer';
import {areaReducer} from './areaReducer';
import {favouritesReducer} from './favouritesReducer';
import {customerReducer} from './customerReducer';

export default combineReducers({
  cart: cartReducer,
  user: authReducer,
  area: areaReducer,
  fav: favouritesReducer,
  customer: customerReducer,
});
