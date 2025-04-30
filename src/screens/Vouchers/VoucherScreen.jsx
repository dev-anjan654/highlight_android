import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import HomeScreenHeader from '../../components/Header/HomeScreenHeader';

const VoucherScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeScreenHeader />
      <View style={styles.container}>
        <Text
          style={{
            color: '#525252',
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 15,
          }}>
          Vouchers / Promotions
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});

export default VoucherScreen;
