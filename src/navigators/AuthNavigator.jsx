import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingScreen from '../screens/LandingScreen/LandingScreen';

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator();
  const options = {headerShown: false};

  // Checking if the app is launched for the first time
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const value = await AsyncStorage.getItem('hasLaunched');
      if (value === null) {
        // If it hasn't launched before, set to true
        setIsFirstLaunch(true);
        // Optionally, set the value in AsyncStorage
        await AsyncStorage.setItem('hasLaunched', 'true');
      } else {
        // If it has launched before, set to false
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    // Still loading
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {isFirstLaunch && (
        <Stack.Screen
          name="Initial"
          component={LandingScreen}
          options={options}
        />
      )}
      <Stack.Screen name="Login" component={Login} options={options} />
      <Stack.Screen name="Signup" component={Signup} options={options} />
    </Stack.Navigator>
  );
}
