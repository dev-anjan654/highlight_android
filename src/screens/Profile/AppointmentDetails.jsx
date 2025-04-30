import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchAllDetails, fetchOrdersById} from '../../utility/api';
import {useSelector} from 'react-redux';

const AppointmentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {order_id, order_date} = route.params;
  const {branch} = useSelector(state => state.branch);
  const [orderItems, setOrderItems] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getOrdersById = async () => {
    const body = {order_id: Number(order_id)};
    setIsLoading(true);
    try {
      const result = await fetchOrdersById(body);
      if (result?.status == 200) {
        setOrderItems(result?.data?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getAllBranches = async () => {
    const end_url = 'get_all_branches';
    try {
      const result = await fetchAllDetails(end_url);
      setBranches(result?.data?.branches);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrdersById();
    getAllBranches();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrdersById().finally(() => setRefreshing(false));
  }, []);

  //Price calculation
  const serviceTotalAmount = Math.floor(
    orderItems
      .map(item => {
        return item.Price;
      })
      .reduce((total, value) => total + value, 0),
  );
  const netTotalAmount = Math.floor(
    orderItems
      .map(item => {
        return item.NetAmount;
      })
      .reduce((total, value) => total + value, 0),
  );

  const branchDetailsById = branches?.find(item => item.id === branch?.id);

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={20} style={{color: '#fff'}} />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 18}}>Appointment Details</Text>
        <View></View>
      </LinearGradient>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#ee2a7b'} size={'large'} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.container}>
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
            {orderItems?.map((item, index) => {
              return (
                <View style={styles.serviceSummary} key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: '#000'}}>{item?.ServiceName}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                      }}>
                      <Text style={{color: '#000'}}>₹{item?.Price}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.dateTimeView}>
            <Icon name="calendar-outline" size={14} style={{color: 'green'}} />
            <Text style={{color: '#000'}}>{order_date}</Text>
          </View>

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
                <Text style={{color: '#000', fontSize: 16}}>Service Total</Text>
                <Text style={{color: '#000', fontWeight: '600', fontSize: 16}}>
                  ₹{serviceTotalAmount}
                </Text>
              </View>
              <View style={styles.priceLine}>
                <Text style={{color: '#000', fontSize: 16}}>Tax</Text>
                <Text style={{color: '#000', fontWeight: '600', fontSize: 16}}>
                  ₹00.00
                </Text>
              </View>
              <View style={styles.priceLine}>
                <Text style={{color: '#000', fontSize: 16}}>Discount</Text>
                <Text style={{color: '#000', fontWeight: '600', fontSize: 16}}>
                  - ₹{serviceTotalAmount - netTotalAmount}
                </Text>
              </View>
              <View style={styles.devider}></View>
              <View style={styles.priceLine}>
                <Text style={{color: '#000', fontWeight: '600', fontSize: 18}}>
                  Net Total
                </Text>
                <Text style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
                  ₹{netTotalAmount}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.bottomTab}>
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 16}}>
          Branch Contact No: {branchDetailsById?.contact_person_no}
        </Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  serviceSummary: {
    width: '100%',
    backgroundColor: '#e4e4e4',
    height: 'auto',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  serviceSummaryContainer: {
    width: '100%',
    marginBottom: 20,
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
    gap: 10,
  },
  priceSection: {
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
  bottomTab: {
    width: '80%',
    height: 45,
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#6228d7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default AppointmentDetails;
