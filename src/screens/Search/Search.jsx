import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, fetchAllDetails, removeCartItem} from '../../utility/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchCartDetails} from '../../Store/cartSlice';
import notFoundImg from '../../assets/not_found.png';
import {useFocusEffect} from '@react-navigation/native';

const SearchScreen = () => {
  const textInputRef = useRef();
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState('');
  const {branch} = useSelector(state => state.branch);
  const branchId = branch?.id;
  const [services, setServices] = useState([]);
  const [genders, setGenders] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // Focus the text input when the screen is focused
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, []),
  );

  const cartList = useSelector(state => state.cart.cartDetails);

  // Filter cartList based on user and branch
  const filteredCartList = cartList?.filter(
    item => item?.branch_id === branchId,
  );

  // Fetch all services
  const getAllServices = async () => {
    const end_url = 'get_services';
    try {
      const result = await fetchAllDetails(end_url);
      setServices(result?.data?.services);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch various data
  const getAllGenders = async () => {
    const end_url = 'get_genders';
    try {
      const result = await fetchAllDetails(end_url);
      setGenders(result?.data?.genders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
    getAllGenders();
  }, []);

  const servicesByBranchId = services?.filter(service =>
    service?.branches?.some(branch => branch?.branch_id == branchId),
  );

  const handleSearch = text => {
    setSearchVal(text);

    if (text.length === 0) {
      // If search value is empty, show no services
      setFilteredServices([]);
      return;
    }
    const filtered = servicesByBranchId.filter(service =>
      service?.service_name?.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredServices(filtered);
  };

  //get gender
  const getGender = genderId => {
    const genderDetails = genders.find(gender => gender.id === genderId);
    return genderDetails.gender_name;
  };

  const addCartHandler = async service => {
    const tokenData = await AsyncStorage.getItem('user_log');
    const parsedToken = JSON.parse(tokenData);
    const body = {
      user_id: parsedToken?.userId,
      branch_id: branchId,
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
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Image
          source={require('../../assets/logo-icon.png')}
          style={{width: 40, height: 40}}
        />
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search here..."
            placeholderTextColor={'#a8a8a8'}
            style={styles.input}
            ref={textInputRef}
            value={searchVal}
            onChangeText={handleSearch}
          />
          <Icon name="search-outline" size={20} style={{color: '#a8a8a8'}} />
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {filteredServices.length > 0 ? (
            filteredServices?.map((item, index) => {
              // Check if the current service is in the cart
              const isServiceInCart = filteredCartList?.some(
                cartItem => cartItem?.service_id === item?.service_id,
              );

              return (
                <View style={styles.eachService} key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <View style={styles.serviceLine}>
                        <Icon
                          name="brush"
                          size={16}
                          style={{color: '#6228d7'}}
                        />
                        <Text style={styles.serviceName}>
                          {item?.service_name}
                        </Text>
                        <View style={styles.genderView}>
                          <Text style={{color: '#fff', fontSize: 12}}>
                            {getGender(item?.gender_id)}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.priceLine}>
                        <Text style={{color: '#525252', fontWeight: '700'}}>
                          ₹{item?.net_amount}
                        </Text>
                        <Text
                          style={{
                            color: '#808080',
                            textDecorationLine: 'line-through',
                            fontWeight: '600',
                          }}>
                          ₹{item?.price}
                        </Text>
                        <Text style={{color: 'green', fontWeight: '600'}}>
                          {item?.amount_check === 1
                            ? `₹${item?.discount} off`
                            : `${item?.discount}% off`}
                        </Text>
                      </View>

                      {item?.service_duration && (
                        <View style={styles.durationLine}>
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
                        isServiceInCart
                          ? removeCartHandler(item)
                          : addCartHandler(item)
                      }
                      style={[
                        styles.addBtn,
                        isServiceInCart && styles.addedBtn,
                      ]}>
                      <Text style={{color: '#fff', fontWeight: '600'}}>
                        {isServiceInCart ? 'Added' : 'Add'}
                      </Text>
                      {!isServiceInCart && (
                        <Icon name="add" size={16} style={{color: '#fff'}} />
                      )}
                    </TouchableOpacity>
                  </View>

                  <Text style={{color: '#525252', fontSize: 14}}>
                    {item?.service_description}
                  </Text>
                </View>
              );
            })
          ) : searchVal.length > 0 ? (
            <View style={styles.noServiceContainer}>
              <Image source={notFoundImg} style={styles.noServiceImage} />
              <Text style={styles.noServiceText}>No services found</Text>
            </View>
          ) : (
            <View style={styles.noServiceContainer}>
              <Image source={notFoundImg} style={styles.noServiceImage} />
              <Text style={styles.noServiceText}>No services available</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 15,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  input: {
    width: '90%',
    height: '100%',
    color: '#000',
  },
  eachService: {
    width: '100%',
    height: 'auto',
    padding: 15,
    elevation: 3,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 4,
  },
  serviceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#525252',
  },
  genderView: {
    width: 'auto',
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#000',
    borderRadius: 50,
    marginLeft: 10,
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  durationLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  addBtn: {
    width: 'auto',
    height: 30,
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
  noServiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noServiceImage: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
  noServiceText: {
    fontSize: 18,
    color: '#525252',
    fontWeight: '600',
  },
});

export default SearchScreen;
