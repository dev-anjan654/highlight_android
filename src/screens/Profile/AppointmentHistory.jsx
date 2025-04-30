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
import {useNavigation} from '@react-navigation/native';
import {fetchAppointmentHistory} from '../../utility/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const AppointmentHistory = () => {
  const navigation = useNavigation();
  const {branch} = useSelector(state => state.branch);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getAppointmentHistory = async () => {
    const tokenData = await AsyncStorage.getItem('user_log');
    const parsedToken = JSON.parse(tokenData);
    const body = {
      user_id: parsedToken?.userId,
      branch_id: branch?.id,
    };
    setIsLoading(true);
    try {
      const result = await fetchAppointmentHistory(body);
      if (result?.status == 200) {
        setAppointmentHistory(result?.data?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAppointmentHistory();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAppointmentHistory().finally(() => setRefreshing(false));
  }, []);

  // Function to get the background color based on order status
  const getStatusColor = status => {
    switch (status) {
      case 'Completed':
        return '#4CAF50'; // Green
      case 'Pending':
        return '#FF9800'; // Dark Yellow
      case 'Cancelled':
        return '#F44336'; // Red
      default:
        return '#ff9900da';
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={18} style={{color: '#fff'}} />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 16}}>Appointment History</Text>
        <View></View>
      </LinearGradient>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#ee2a7b'} size={'large'} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.container}>
          {appointmentHistory?.length > 0 ? (
            appointmentHistory?.map(item => {
              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('AppointmentDetails', {
                      order_id: item.id,
                      order_date: item?.order_date,
                    })
                  }
                  style={styles.appontmentCard}>
                  <View style={styles.info}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                          marginBottom: 10,
                        }}>
                        <Icon
                          size={18}
                          style={{color: '#487fff'}}
                          name="checkmark-circle"
                        />
                        <Text
                          style={{
                            color: '#525252',
                            fontSize: 16,
                            fontWeight: '600',
                          }}>
                          {item.unique_order_number}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                          marginBottom: 10,
                        }}>
                        <Icon
                          name="calendar-outline"
                          size={14}
                          style={{color: 'green'}}
                        />
                        <Text style={{color: '#525252', fontSize: 14}}>
                          {item.order_date}
                        </Text>
                      </View>
                      <View style={styles.priceLine}>
                        <Text style={styles.finalPrice}>
                          ₹{item.total_amount}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.status,
                        {backgroundColor: getStatusColor(item?.order_status)},
                      ]}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                        {item.order_status}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#525252', fontWeight: '600', fontSize: 18}}>
                No History Available
              </Text>
            </View>
          )}
        </ScrollView>
      )}
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
    padding: 15,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  appontmentCard: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#e4e4e4',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  finalPrice: {
    color: '#525252',
    fontWeight: '600',
  },
  status: {
    width: 'auto',
    height: 'auto',
    //backgroundColor: '#ff9900da',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
});

export default AppointmentHistory;
