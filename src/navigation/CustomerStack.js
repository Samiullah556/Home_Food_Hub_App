import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/OrderFood/Login';
import Signup from '../screens/OrderFood/Signup';

const Stack = createStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{header: () => null}}
        name="CustomerLogin"
        component={Login}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="CustomerSignup"
        component={Signup}
      />
    </Stack.Navigator>
  );
};

export default CustomerStack;
