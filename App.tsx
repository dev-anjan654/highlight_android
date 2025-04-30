import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/Store/store';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import HomeNavigator from './src/navigators/HomeNavigator';
import AuthNavigator from './src/navigators/AuthNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthContext.Consumer>
              {({ isLoggedIn }) => (
                isLoggedIn ? <HomeNavigator /> : <AuthNavigator />
              )}
            </AuthContext.Consumer>
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
