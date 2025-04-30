import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutModal from '../../components/Modal/LogoutModal';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserDetails} from '../../Store/userSlice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userDetails);
  const userStatus = useSelector(state => state.user.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, userStatus]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={18} style={{color: '#fff'}} />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 18}}>Profile</Text>
        <View></View>
      </LinearGradient>
      <ScrollView style={styles.container}>
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: 'https://avatar.iran.liara.run/public/boy?username=Ash',
            }}
            style={{width: 80, height: 80, borderRadius: 99, marginBottom: 10}}
          />
          <Text
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: '#000',
              marginBottom: 5,
            }}>
            {userDetails?.customer?.first_name}
          </Text>
          <Text style={{fontSize: 14, color: '#000'}}>
            {userDetails?.customer?.email}
          </Text>
        </View>

        <View style={styles.generalSettings}>
          <View style={styles.heading}>
            <Text style={{color: '#8c8c8c', fontSize: 18}}>
              General Settings
            </Text>
          </View>
          <View style={styles.settingsWrapper}>
            {/* <Pressable
              onPress={() => navigation.navigate('AccountDetails')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                }}>
                <Image
                  source={require('../../assets/keyIcon.png')}
                  style={styles.keyIcon}
                />
                <Text style={{color: '#000', fontSize: 18}}>
                  Change Account Details
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                style={{color: '#8c8c8c'}}
              />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                }}>
                <Image
                  source={require('../../assets/keyIcon.png')}
                  style={styles.keyIcon}
                />
                <Text style={{color: '#000', fontSize: 18}}>
                  Change Password
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                style={{color: '#8c8c8c'}}
              />
            </Pressable> */}
            <Pressable
              onPress={() => navigation.navigate('AppointmentHistory')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Icon name="reader-outline" size={22} style={{color: '#000'}} />
                <Text style={{color: '#000', fontSize: 18}}>
                  Your Appointments
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                style={{color: '#8c8c8c'}}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.generalSettings}>
          <View style={styles.heading}>
            <Text style={{color: '#8c8c8c', fontSize: 18}}>Information</Text>
          </View>
          <View style={styles.settingsWrapper}>
            <Pressable
              onPress={() => navigation.navigate('AboutUs')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Icon
                  name="phone-portrait-outline"
                  size={22}
                  style={{color: '#000'}}
                />
                <Text style={{color: '#000', fontSize: 18}}>About App</Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                style={{color: '#8c8c8c'}}
              />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Icon name="document-text" size={22} style={{color: '#000'}} />
                <Text style={{color: '#000', fontSize: 18}}>
                  Tearms & Conditions
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                style={{color: '#8c8c8c'}}
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('PrivacyPolicy')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Icon
                  name="shield-checkmark"
                  size={22}
                  style={{color: '#000'}}
                />
                <Text style={{color: '#000', fontSize: 18}}>
                  Privacy Policy
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                style={{color: '#8c8c8c'}}
              />
            </Pressable>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.logoutBtn}>
          <Text style={{color: '#fff', fontSize: 16}}>Logout</Text>
          <Icon name="log-out-outline" size={22} style={{color: '#fff'}} />
        </TouchableOpacity>

        {/* Logout Modal */}
        <LogoutModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
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
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  profileInfo: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  heading: {
    width: '100%',
    backgroundColor: '#e4e4e4',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  settingsWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  keyIcon: {
    width: 30,
    height: 30,
  },
  logoutBtn: {
    width: '90%',
    height: 45,
    backgroundColor: '#000',
    borderRadius: 50,
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 5,
    marginTop: 15,
    marginBottom: 30,
  },
});

export default ProfileScreen;
