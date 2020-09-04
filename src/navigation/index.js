import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import Screen from '../screens/Screen';
import NewDish from '../screens/SellFood/NewDish';
import Address from '../screens/SellFood/Address';
import RequestedDish from '../screens/SellFood/RequestedDish';
import OrderFoodStack from './OrderFoodStack';
import SellFoodStack from './SellFoodStack';
import ChangePassword from '../screens/SellFood/ChangePasssword';
import ForgotPassword from '../screens/SellFood/ForgotPassword';
import Order from '../screens/SellFood/Order';
import AuthStack from './AuthStack';
import CustomerStack from './CustomerStack';
import Terms from '../screens/Terms';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ header: () => null }}
          name="Starting Screen"
          component={StartScreen}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name="Screen"
          component={Screen}
        />
        <Stack.Screen name="New Dish" component={NewDish} />
        <Stack.Screen
          options={{ header: () => null }}
          name="Auth Stack"
          component={AuthStack}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name="Customer Stack"
          component={CustomerStack}
        />
        <Stack.Screen name="Update Password" component={ChangePassword} />
        <Stack.Screen name="Order History" component={Order} />
        <Stack.Screen
          options={{ header: () => null }}
          name="ChefForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name="Terms & Conditions"
          component={Terms}
        />
        <Stack.Screen name="New Dish Requests" component={RequestedDish} />
        <Stack.Screen name="Add Address" component={Address} />
        <Stack.Screen
          options={{ header: () => null }}
          name="Order Food"
          component={OrderFoodStack}
        />
        <Stack.Screen
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#6C3483',
            },
            headerLeft: () => null,
            navigationOptions: {
              headerLeft: null,
            },
            headerTintColor: 'white',
          }}
          name="Dashboard"
          component={SellFoodStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
