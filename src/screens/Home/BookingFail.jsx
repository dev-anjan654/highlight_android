import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BookingFail = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/asset3.png')}
          style={styles.topImage}
        />
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/failStamp.png')}
            style={{width: 200, height: 150, marginBottom: 30}}
          />
          <Text
            style={{
              fontSize: 25,
              color: '#000',
              fontWeight: '600',
              marginBottom: 15,
            }}>
            BOOKING UNSUCCESSFUL
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#525252',
              marginBottom: 40,
              textAlign: 'center',
            }}>
            Sorry For The Incovinence
          </Text>
          <Pressable>
            <Text style={{color: '#6228d7', fontSize: 16, fontWeight: '600'}}>
              TRY AGAIN
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

export default BookingFail;
