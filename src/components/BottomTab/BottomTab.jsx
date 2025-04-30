import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const BottomTab = ({title, screen, params, onPress}) => {
  const navigation = useNavigation();
  const cartList = useSelector(state => state.cart.cartDetails);
  const {branch} = useSelector(state => state.branch);

  //filter cartList based on user and branch
  const filteredCartList = cartList?.filter(
    item => item?.branch_id === branch?.id,
  );

  const handlePress = async () => {
    if (title === 'Book Now') {
      await onPress();
    } else {
      navigation.navigate(`${screen}`, {params});
    }
  };

  return (
    <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.bottomTab}>
      <View style={styles.devider}></View>
      <View>
        <Text style={{color: '#fff', fontSize: 14}}>
          {filteredCartList?.length} Services
        </Text>
      </View>
      <View style={styles.devider}></View>
      <Pressable
        onPress={handlePress}
        style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Text style={{color: '#fff', fontSize: 16}}>{title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Icon name="chevron-forward" size={18} style={{color: '#fff'}} />
          <Icon name="chevron-forward" size={18} style={{color: '#e1e1e1'}} />
          <Icon name="chevron-forward" size={18} style={{color: '#a8a8a8'}} />
        </View>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    width: '80%',
    height: 45,
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#6228d7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  devider: {
    width: 2,
    height: '98%',
    backgroundColor: '#fff',
  },
});

export default BottomTab;
