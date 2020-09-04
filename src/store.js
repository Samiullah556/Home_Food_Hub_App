import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //  window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
