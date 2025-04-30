import React from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeCartItem} from '../../utility/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchCartDetails} from '../../Store/cartSlice';

const ServiceCard = ({item}) => {
  const dispatch = useDispatch();
  const {branch} = useSelector(state => state.branch);
  const cartList = useSelector(state => state.cart.cartDetails);

  //filter cartList based on user and branch
  const filteredCartList = cartList?.filter(
    item => item?.branch_id === branch?.id,
  );

  const isServiceInCart = filteredCartList?.some(
    cartItem => cartItem?.service_id === item?.service_id,
  );

  const addCartHandler = async service => {
    const tokenData = await AsyncStorage.getItem('user_log');
    const parsedToken = JSON.parse(tokenData);
    const body = {
      user_id: parsedToken?.userId,
      branch_id: branch?.id,
      service_id: service?.service_id,
    };

    try {
      const result = await addToCart(body);
      if (result.status == 201) {
        ToastAndroid.show('Successfully added to cart', ToastAndroid.LONG);
        // After adding to the cart, update the cart list
        dispatch(fetchCartDetails());
      } else {
        ToastAndroid.show(result?.response?.data?.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
      console.log(error);
    }
  };

  // Function to remove the service from the cart
  const removeCartHandler = async service => {
    const tokenData = await AsyncStorage.getItem('user_log');
    const parsedToken = JSON.parse(tokenData);

    const cartItem = filteredCartList?.find(
      item => item.service_id === service.service_id,
    );
    const body = {
      user_id: parsedToken?.userId,
      cart_item_id: cartItem.cart_item_id,
    };

    try {
      const result = await removeCartItem(body);
      if (result.status === 200) {
        dispatch(fetchCartDetails());
        ToastAndroid.show('Successfully removed', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(result?.response?.data?.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.eachService}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
            }}>
            <Icon name="brush" size={16} style={{color: '#000'}} />
            <Text
              style={{
                color: '#525252',
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 10,
              }}>
              {item?.service_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
            }}>
            <Text style={{color: '#525252', fontWeight: '700'}}>
              ₹{item?.net_amount}
            </Text>
            {item?.discount !== '' && (
              <Text
                style={{
                  color: '#808080',
                  textDecorationLine: 'line-through',
                  fontWeight: '600',
                }}>
                ₹{item?.price}
              </Text>
            )}
            {item?.discount !== '' && (
              <Text style={{color: 'green', fontWeight: '600'}}>
                {item?.amount_check === 1
                  ? `₹${item?.discount} off`
                  : `${item?.discount}% off`}
              </Text>
            )}
          </View>
          {item?.service_duration && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}>
              <Icon
                name="hourglass-outline"
                size={18}
                style={{color: '#000'}}
              />
              <Text style={{color: '#525252', fontSize: 16}}>
                {item?.service_duration}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            isServiceInCart ? removeCartHandler(item) : addCartHandler(item)
          }
          style={[styles.addBtn, isServiceInCart && styles.addedBtn]}>
          <Text style={{color: '#fff', fontWeight: '600'}}>
            {isServiceInCart ? 'Added' : 'Add'}
          </Text>
          {!isServiceInCart && (
            <Icon name="add" size={16} style={{color: '#fff'}} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={{color: '#525252', fontSize: 16}}>
        {item?.service_description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  eachService: {
    borderBottomWidth: 1,
    borderColor: '#a8a8a8',
    marginBottom: 5,
    paddingVertical: 15,
  },
  addBtn: {
    width: 80,
    height: 32,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee2a7b',
  },
  addedBtn: {
    backgroundColor: 'green',
  },
});

export default ServiceCard;
