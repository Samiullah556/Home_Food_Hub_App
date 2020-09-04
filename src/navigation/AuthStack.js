import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/SellFood/Login';
import Signup from '../screens/SellFood/Signup';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{header: () => null}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Signup"
        component={Signup}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
