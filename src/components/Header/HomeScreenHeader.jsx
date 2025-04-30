import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserDetails} from '../../Store/userSlice';

const HomeScreenHeader = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userDetails);
  const userStatus = useSelector(state => state.user.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, userStatus]);

  return (
    <View style={styles.header}>
      <LinearGradient
        colors={['#ee2a7b', '#6228d7']}
        style={styles.contentWrapper}>
        <View style={styles.top}>
          <Image
            source={require('../../assets/logo-icon.png')}
            style={{width: 40, height: 40}}
          />
          <Pressable
            onPress={() => navigation.navigate('SearchScreen')}
            style={styles.searchBar}>
            <Text style={{color: '#a8a8a8', width: '90%'}}>Search here...</Text>
            <Icon name="search-outline" size={20} style={{color: '#a8a8a8'}} />
          </Pressable>
        </View>
        <View style={styles.bottom}>
          <Pressable
            onPress={() => navigation.navigate('ProfileScreen')}
            style={styles.user}>
            <Image
              source={{
                uri: 'https://avatar.iran.liara.run/public/boy?username=Ash',
              }}
              style={{width: 40, height: 40, borderRadius: 99}}
            />
            <View style={styles.info}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Welcome!
              </Text>
              <Text style={{color: '#fff', fontSize: 12}}>
                {userDetails?.customer?.first_name}
              </Text>
            </View>
          </Pressable>
          {/* <Pressable
            onPress={() => navigation.navigate('NotificationScreen')}
            style={styles.bellWrapper}>
            <Icon
              name="notifications-outline"
              size={22}
              style={{color: '#a8a8a8'}}
            />
          </Pressable> */}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 120, // Ensure height is explicitly set
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
  },
  contentWrapper: {
    flex: 1, // Make sure this view takes up the entire height of the header
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: 'space-between', // Ensure content is spaced correctly
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchBar: {
    width: '80%',
    height: 35,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellWrapper: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 99,
  },
});

export default HomeScreenHeader;
