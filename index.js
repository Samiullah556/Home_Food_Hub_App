import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name} from './app.json';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/store';

const themeOptions = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6C3483',
    accent: '#e6e6e6',
  },
};

const Index = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={themeOptions}>
        <App />
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(name, () => Index);
