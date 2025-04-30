import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeScreenHeader from '../../components/Header/HomeScreenHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCartDetails} from '../../Store/cartSlice';
import {removeCartItem} from '../../utility/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartList = useSelector(state => state.cart.cartDetails);
  const {branch} = useSelector(state => state.branch);
  const status = useSelector(state => state.cart.status);
  const error = useSelector(state => state.cart.error);
  const [refreshing, setRefreshing] = useState(false);

  //filter cartList based on user and branch
  const filteredCartList = cartList?.filter(
    item => item?.branch_id === branch?.id,
  );

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchCartDetails()).finally(() => setRefreshing(false));
  }, [dispatch]);

  const removeCartHandler = async cartItemId => {
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
        ToastAndroid.show('Successfully removed', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(result?.response?.data?.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    }
  };

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

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <HomeScreenHeader />
      {status === 'loading' ? (
        <ActivityIndicator size="large" color="#ee2a7b" />
      ) : (
        <ScrollView
          contentContainerStyle={
            filteredCartList?.length === 0 && styles.emptyCartContainer
          }
          style={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
              {/* Summary Section */}
              <View style={styles.summarySection}>
                <View style={styles.summaryHeader}>
                  <Text style={styles.summaryText}>Summary</Text>
                  <View></View>
                </View>
                <View style={styles.serviceSummaryContainer}>
                  {filteredCartList?.map(cartItem => {
                    return (
                      <View
                        key={cartItem?.cart_item_id}
                        style={styles.serviceSummary}>
                        <View style={styles.serviceSummaryContent}>
                          <Text style={{color: '#000'}}>
                            {cartItem?.service_name}
                          </Text>
                          <View style={styles.serviceSummaryActions}>
                            <Text style={{color: '#000'}}>
                              ₹{cartItem?.price}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                removeCartHandler(cartItem?.cart_item_id)
                              }>
                              <Icon
                                name="trash-outline"
                                size={18}
                                style={{color: 'red'}}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={styles.bookNowContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DateSelection')}
                  style={styles.greenBtn}>
                  <Text style={{color: '#fff', fontWeight: '600'}}>
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Price Section */}
              <View style={styles.priceSection}>
                <View style={styles.priceHeader}>
                  <Text style={styles.summaryText}>Payment Summary</Text>
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
      )}
      {status === 'failed' && (
        <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
    marginTop: 120,
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
  summarySection: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: '#a8a8a8',
    borderBottomWidth: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  summaryText: {
    color: '#525252',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 15,
  },
  serviceSummaryContainer: {
    width: '100%',
    marginBottom: 20,
  },
  serviceSummary: {
    width: '100%',
    backgroundColor: '#e4e4e4',
    height: 'auto',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  serviceSummaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  serviceSummaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  bookNowContainer: {
    marginTop: 15,
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },
  greenBtn: {
    width: 'auto',
    paddingHorizontal: 20,
    height: 40,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
  },
  priceSection: {
    padding: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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

export default CartScreen;
