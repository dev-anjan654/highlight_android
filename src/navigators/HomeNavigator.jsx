import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StoreSelectionScreen from '../screens/StoreSelection/StoreSelectionScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CategoryScreen from '../screens/Home/CategoryScreen';
import ServiceScreen from '../screens/Home/ServiceScreen';
import DateSelection from '../screens/Home/DateSelection';
import FinalBookingScreen from '../screens/Home/FinalBookingScreen';
import AboutUs from '../screens/Profile/AboutUs';
import PrivacyPolicy from '../screens/Profile/PrivacyPolicy';
import AccountDetails from '../screens/Profile/AccountDetails';
import AppointmentHistory from '../screens/Profile/AppointmentHistory';
import BookingSuccessful from '../screens/Home/BookingSuccessful';
import BookingFail from '../screens/Home/BookingFail';
import NotificationScreen from '../screens/Home/NotificationScreen';
import AppointmentDetails from '../screens/Profile/AppointmentDetails';

export default function HomeNavigator() {
  const Stack = createNativeStackNavigator();
  const options = {headerShown: false};

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="StoreSelectionScreen"
        component={StoreSelectionScreen}
        options={options}
      />
      <Stack.Screen
        name="BottomTabScreen"
        component={BottomTabNavigator}
        options={options}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={options}
      />
      <Stack.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={options}
      />
      <Stack.Screen
        name="DateSelection"
        component={DateSelection}
        options={options}
      />
      <Stack.Screen
        name="FinalBookingScreen"
        component={FinalBookingScreen}
        options={options}
      />
      <Stack.Screen name="AboutUs" component={AboutUs} options={options} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={options}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={options}
      />
      <Stack.Screen
        name="AppointmentHistory"
        component={AppointmentHistory}
        options={options}
      />
      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
        options={options}
      />
      <Stack.Screen
        name="BookingSuccessful"
        component={BookingSuccessful}
        options={options}
      />
      <Stack.Screen
        name="BookingFail"
        component={BookingFail}
        options={options}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={options}
      />
    </Stack.Navigator>
  );
}
