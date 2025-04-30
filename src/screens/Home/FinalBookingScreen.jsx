import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomTab from '../../components/BottomTab/BottomTab';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {placeOrder, removeCartItem} from '../../utility/api';
import {fetchCartDetails} from '../../Store/cartSlice';

const FinalBookingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {branch} = useSelector(state => state.branch);
  const {booking_date} = useSelector(state => state.date);
  const cartList = useSelector(state => state.cart.cartDetails);

  //filter cartList based on user and branch
  const filteredCartList = cartList?.filter(
    item => item?.branch_id === branch?.id,
  );

  // Format the date
  const formattedBookingDate = moment(booking_date.date).format('D MMMM YYYY');

  //Price calculation
  const serviceTotalAmount = Math.floor(
    filteredCartList
      .map(item => {
        return item.price;
      })
      .reduce((total, value) => total + value, 0),
  );
  const netTotalAmount = Math.floor(
    filteredCartList
      .map(item => {
        return item.net_amount;
      })
      .reduce((total, value) => total + value, 0),
  );

  const removeItemHandler = async cartItemId => {
    const tokenData = await AsyncStorage.getItem('user_log');
    const parsedToken = JSON.parse(tokenData);
    const body = {
      user_id: parsedToken?.userId,
      cart_item_id: cartItemId,
    };
    try {
      const result = await removeCartItem(body);
      if (result.status === 200) {
        dispatch(fetchCartDetails());
        ToastAndroid.show('Successfully Removed', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(result?.response?.data?.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    }
  };

  //place order
  const placeOrderHandler = async () => {
    const tokenData = await AsyncStorage.getItem('user_log');
    const parsedToken = JSON.parse(tokenData);
    const body = {
      branch_id: branch?.id,
      user_id: parsedToken?.userId,
      order_date: moment(booking_date?.date).format('YYYY-MM-DD'),
      total_amount: netTotalAmount,
    };
    try {
      const result = await placeOrder(body);

      if (result?.status === 201) {
        dispatch(fetchCartDetails());
        navigation.navigate('BookingSuccessful', {
          bookingId: result?.data?.unique_order_number,
        });
      } else {
        navigation.navigate('BookingFail');
      }
    } catch (error) {
      console.log(error);
      navigation.navigate('BookingFail');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'relative',
      }}>
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-circle-outline"
            size={24}
            style={{color: '#fff'}}
          />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
          {branch.name}
        </Text>
      </LinearGradient>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={
          filteredCartList?.length === 0 && styles.emptyCartContainer
        }>
        {/* Apply ScrollView */}
        {filteredCartList?.length === 0 ? (
          <View style={styles.emptyCartView}>
            <Image
              source={require('../../assets/empty_cart.png')}
              style={styles.emptyCartImage}
            />
            <Text style={styles.emptyCartText}>Your cart is empty!</Text>
          </View>
        ) : (
          <View>
            <View style={styles.summarySection}>
              {/* Summary Section */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#525252',
                    fontSize: 18,
                    fontWeight: '600',
                    textAlign: 'left',
                    marginBottom: 15,
                  }}>
                  Summary
                </Text>
                <View></View>
              </View>
              <View style={styles.serviceSummaryContainer}>
                {filteredCartList?.map((item, index) => {
                  return (
                    <View style={styles.serviceSummary} key={index}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{color: '#000'}}>
                          {item?.service_name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                          }}>
                          <Text style={{color: '#000'}}>₹{item?.price}</Text>
                          <TouchableOpacity
                            onPress={() =>
                              removeItemHandler(item?.cart_item_id)
                            }>
                            <Icon
                              name="trash-outline"
                              size={16}
                              style={{color: 'red'}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.dateTimeView}>
                <Text style={{color: '#000'}}>
                  Date: {formattedBookingDate}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DateSelection')}>
                  <Icon
                    name="create-outline"
                    size={18}
                    style={{color: '#000'}}
                  />
                </TouchableOpacity>
              </View>
              {/* <View style={styles.dateTimeView}>
            <Text style={{color: '#000'}}>Time: 03:30 PM</Text>
            <Icon name="create-outline" size={18} style={{color: '#000'}} />
          </View> */}
            </View>
            {/* Voucher Section */}
            {/* <View style={styles.voucherSection}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text
              style={{
                color: '#525252',
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'left',
                marginBottom: 15,
              }}>
              Apply Voucher
            </Text>
            <View></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 10,
            }}>
            <TextInput
              placeholder="Voucher No."
              placeholderTextColor={'#000'}
              style={styles.input}
            />
            <TouchableOpacity style={styles.greenBtn}>
              <Text style={{color: '#fff', fontSize: 16}}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View> */}
            {/* Price Section */}
            <View style={styles.priceSection}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#525252',
                    fontSize: 18,
                    fontWeight: '600',
                    textAlign: 'left',
                    marginBottom: 15,
                  }}>
                  Payment Summary
                </Text>
                <View></View>
              </View>
              <View style={styles.priceBox}>
                <View style={styles.priceLine}>
                  <Text style={{color: '#000', fontSize: 16}}>
                    Service Total
                  </Text>
                  <Text
                    style={{color: '#000', fontWeight: '600', fontSize: 16}}>
                    ₹{serviceTotalAmount}
                  </Text>
                </View>
                <View style={styles.priceLine}>
                  <Text style={{color: '#000', fontSize: 16}}>Tax</Text>
                  <Text
                    style={{color: '#000', fontWeight: '600', fontSize: 16}}>
                    ₹00.00
                  </Text>
                </View>
                <View style={styles.priceLine}>
                  <Text style={{color: '#000', fontSize: 16}}>Discount</Text>
                  <Text
                    style={{color: '#000', fontWeight: '600', fontSize: 16}}>
                    - ₹{serviceTotalAmount - netTotalAmount}
                  </Text>
                </View>
                <View style={styles.devider}></View>
                <View style={styles.priceLine}>
                  <Text
                    style={{color: '#000', fontWeight: '600', fontSize: 18}}>
                    Net Total
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
                    ₹{netTotalAmount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      {filteredCartList?.length > 0 && (
        <BottomTab title="Book Now" onPress={placeOrderHandler} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  header: {
    width: '100%',
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
    width: '100%',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartImage: {
    width: '80%',
    height: 150,
  },
  emptyCartText: {
    color: '#6228d7',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  summarySection: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: '#a8a8a8',
    borderBottomWidth: 1,
  },
  serviceSummaryContainer: {
    width: '100%',
    marginBottom: 20,
  },
  serviceSummary: {
    width: '100%',
    backgroundColor: '#e4e4e4',
    height: 'auto',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateTimeView: {
    width: '100%',
    backgroundColor: '#e4e4e4',
    height: 'auto',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voucherSection: {
    padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#a8a8a8',
    borderBottomWidth: 1,
  },
  input: {
    width: '70%',
    height: 40,
    backgroundColor: '#e4e4e4',
    paddingHorizontal: 15,
    color: '#000',
    borderRadius: 99,
  },
  greenBtn: {
    width: '25%',
    height: 40,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
  },
  priceSection: {
    padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  priceBox: {
    width: '100%',
    height: 'auto',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e4e4e4',
  },
  priceLine: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  devider: {
    width: '100%',
    height: 1,
    backgroundColor: '#a8a8a8',
    marginBottom: 10,
  },
});

export default FinalBookingScreen;
