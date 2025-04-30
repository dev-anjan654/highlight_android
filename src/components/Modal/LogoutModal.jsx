import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {customerLogout} from '../../utility/api';
import {AuthContext} from '../../context/AuthContext';

const LogoutModal = ({isModalVisible, setModalVisible}) => {
  const {setIsLoggedIn} = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const result = await customerLogout();
      if (result?.status == 200) {
        await AsyncStorage.removeItem('user_log');
        setIsLoggedIn(false);
        ToastAndroid.show('Logout Successful', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(result?.response?.data?.error, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
            Do you want to logout?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelBtn}>
              <Text style={{color: '#fff', fontWeight: '600'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
              <Text style={{color: '#fff', fontWeight: '600'}}>Logout</Text>
              <Icon name="log-out-outline" size={18} style={{color: '#fff'}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  logoutBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#000',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  cancelBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#ee2a7b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default LogoutModal;
