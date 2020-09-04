import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Account from '../screens/SellFood/Account';
import ChangePassword from '../screens/SellFood/ChangePasssword';

import Dishes from '../screens/SellFood/Dishes';
import Login from '../screens/SellFood/Login';
import NewDish from '../screens/SellFood/NewDish';
import Wallet from '../screens/SellFood/Wallet';
import Profile from '../screens/SellFood/Profile';
import Bookings from '../screens/SellFood/Bookings';
import Chat from '../screens/SellFood/Chat';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Dashboard = () =>{
  return(
    <Tab.Navigator
    tabBarOptions={{
      indicatorStyle: {backgroundColor: '#6C3483'},
      // activeTintColor: 'white',
      // inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
      },
    }}
    initialRouteName="Dishes">
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Dishes" component={Dishes} />
    <Tab.Screen name="Bookings" component={Bookings} />
    <Tab.Screen name="Wallet" component={Wallet} />
  </Tab.Navigator>
  );
};

const SellFoodStack = () => {
  return (
  <Stack.Navigator>
    <Stack.Screen
      options={{ header: () => null }}
      name="Main Screen"
      component={Dashboard}
    />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
  );
};

// const SellFoodStack = () => {
//   return (
//     <Tab.Navigator
//     tabBarOptions={{
//       indicatorStyle: {backgroundColor: '#6C3483'},
//       // activeTintColor: 'white',
//       // inactiveTintColor: 'grey',
//       style: {
//         backgroundColor: 'white',
//       },
//     }}
//     initialRouteName="Dishes">
//     <Tab.Screen name="Profile" component={Profile} />
//     <Tab.Screen name="Dishes" component={Dishes} />
//     <Tab.Screen name="Bookings" component={Bookings} />
//     <Tab.Screen name="Wallet" component={Wallet} />
//   </Tab.Navigator>
//   );
// };

export default SellFoodStack;
