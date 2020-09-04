import React, {useEffect} from 'react';
import Navigation from './navigation';
import jwtDecode from 'jwt-decode';
import {connect} from 'react-redux';
import axios from 'axios';
import {setCurrentUser, fillFav, logoutUser} from './redux/actions/auth';
import {addCustomer} from './redux/actions/customer';
import AsyncStorage from '@react-native-community/async-storage';
import {SERVER_URL} from '../app.json';

const App = ({setCurrentUser, fillFav, addCustomer, logoutUser}) => {
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      let favourites = await AsyncStorage.getItem('fav');
      let customer = await AsyncStorage.getItem('customer');
      if (favourites) {
        fillFav(JSON.parse(favourites));
      }
      if (customer) {
        addCustomer(JSON.parse(customer));
      }
      if (token) {
        let res = await axios.get(SERVER_URL + '/auth/getuser?q=' + token);
        setCurrentUser(res.data);
      }
    } catch (e) {
      logoutUser();
      console.log(e);
    }
  };
  return <Navigation />;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  setCurrentUser,
  fillFav,
  addCustomer,
  logoutUser,
})(App);
