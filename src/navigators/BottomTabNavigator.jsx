import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import {fetchCartDetails} from '../Store/cartSlice';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/Search';
import CartScreen from '../screens/Cart/CartScreen';
import StoreLocatorScreen from '../screens/StoreLocator/StoreLocatorScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  const route = useRoute();
  const dispatch = useDispatch();

  //cartItems getting from cartSlice
  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [dispatch]);
  const cartList = useSelector(state => state.cart.cartDetails);
  const {branch} = useSelector(state => state.branch);

  //filter cartList based on user and branch
  const filteredCartList = cartList?.filter(
    item => item?.branch_id === branch?.id,
  );

  const activeColor = '#6228d7';
  const color = '#2e2e2e';
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#000'}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            height: 20,
            fontWeight: '500',
          },
          tabBarIcon: ({size, focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={focused ? activeColor : color}
              style={{marginTop: 5}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarLabelStyle: {
            height: 20,
            fontWeight: '500',
          },
          tabBarIcon: ({size, focused}) => (
            <Icon
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={focused ? activeColor : color}
              style={{marginTop: 5}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Cart',
          tabBarLabelStyle: {
            height: 20,
            fontWeight: '500',
          },
          tabBarIcon: ({size, focused}) => (
            <View style={{position: 'relative'}}>
              <Icon
                name={focused ? 'cart' : 'cart-outline'}
                size={size}
                color={focused ? activeColor : color}
                style={{marginTop: 5}}
              />
              {!focused && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: '#ee2a7b',
                    borderRadius: 99,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: -10,
                  }}>
                  <Text style={{color: '#fff'}}>
                    {filteredCartList?.length > 0
                      ? filteredCartList?.length
                      : filteredCartList?.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StoreLocatorScreen"
        component={StoreLocatorScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Store Locator',
          tabBarLabelStyle: {
            height: 20,
            fontWeight: '500',
          },
          tabBarIcon: ({size, focused}) => (
            <Icon
              name={focused ? 'location' : 'location-outline'}
              size={size}
              color={focused ? activeColor : color}
              style={{marginTop: 5}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            height: 20,
            fontWeight: '500',
          },
          tabBarIcon: ({size, focused}) => (
            <Icon
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={size}
              color={focused ? activeColor : color}
              style={{marginTop: 5}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
