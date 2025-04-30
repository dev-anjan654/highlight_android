import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BookingSuccessful = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bookingId} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/asset3.png')}
          style={styles.topImage}
        />
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/successStamp.png')}
            style={{width: 250, height: 230}}
          />
          <Text
            style={{
              fontSize: 25,
              color: '#000',
              fontWeight: '600',
              marginBottom: 10,
            }}>
            BOOKING SUCCESSFULL
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#525252',
              marginBottom: 15,
              textAlign: 'center',
            }}>
            Thanks For Booking{'\n'}Appointment
          </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: '600',
              fontSize: 16,
              marginBottom: 20,
            }}>
            BOOKING ID: {bookingId}
          </Text>
          <Pressable onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={{color: '#6228d7', fontSize: 16, fontWeight: '600'}}>
              Book another appointment
            </Text>
          </Pressable>
        </View>
        <Image
          source={require('../../assets/asset1.jpg')}
          style={styles.bottomImage}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  topImage: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
  },
  bottomImage: {
    width: '100%',
    height: 150,
    position: 'absolute',
    bottom: 0,
  },
});

export default BookingSuccessful;
