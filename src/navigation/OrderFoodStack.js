import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/OrderFood/Home';
import ViewFood from '../screens/OrderFood/ViewFood';
import Location from '../screens/OrderFood/Location';
import Filter from '../screens/OrderFood/Filter';
import MyCart from '../screens/OrderFood/MyCart';
import Favourites from '../screens/OrderFood/Favourites';
import Checkout from '../screens/OrderFood/Checkout';
import Auth from '../screens/OrderFood/Auth';
import QR from '../screens/OrderFood/QR';
import BookChef from '../screens/OrderFood/BookChef';
import RequestDish from '../screens/OrderFood/RequestDish';
import ReserveChef from '../screens/OrderFood/ReserveChef';
import ForgotPassword from '../screens/OrderFood/ForgotPassword';
import Coupon from '../screens/OrderFood/Coupon';
import Chat from '../screens/OrderFood/Chat';

import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'lightgrey',
        style: {
          backgroundColor: '#6C3483',
          height: 55,
        },
      }}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" color={color} focused={focused} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Book Chef"
        component={BookChef}
        options={{
          tabBarLabel: 'Book Chef',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="calendar" color={color} focused={focused} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="heart" color={color} focused={focused} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Auth}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="user" color={color} focused={focused} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const OrderFoodStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ header: () => null }}
        name="Main Screen"
        component={Dashboard}
      />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen
        // options={{header: () => null}}
        name="View Food"
        component={ViewFood}
      />
      <Stack.Screen
        // options={{header: () => null}}
        name="My Cart"
        component={MyCart}
      />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Request Dish" component={RequestDish} />
      <Stack.Screen name="Book a Chef" component={ReserveChef} />
      <Stack.Screen
        options={{ header: () => null }}
        name="CustomerForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen options={{ header: () => null }} name="QR" component={QR} />
      <Stack.Screen
        // options={{header: () => null}}
        name="Checkout"
        component={Checkout}
      />
      <Stack.Screen
        options={{ header: () => null }}
        name="Coupon"
        component={Coupon}
      />
    </Stack.Navigator>
  );
};

export default OrderFoodStack;
