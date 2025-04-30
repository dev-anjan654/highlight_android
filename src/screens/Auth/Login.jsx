import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  BackHandler,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {customerLogin} from '../../utility/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AuthContext';

const Login = () => {
  const {setIsLoggedIn} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState({email: '', password: ''});
  const [backPressCount, setBackPressCount] = useState(0);

  const handleLogin = async () => {
    const body = {
      Email: inputValue.email,
      PasswordHash: inputValue.password,
    };
    try {
      const result = await customerLogin(body);
      if (result?.status == 200) {
        try {
          await AsyncStorage.setItem(
            'user_log',
            JSON.stringify({
              userId: result?.data?.id,
              token: result?.data?.token,
            }),
          );
          ToastAndroid.show('Login successful', ToastAndroid.LONG);
          setIsLoggedIn(true); // Set login status to true
        } catch (storageError) {
          console.error('AsyncStorage error:', storageError);
          ToastAndroid.show('Error saving data', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(result?.response?.data?.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Login error:', error);
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenData = await AsyncStorage.getItem('user_log');
        if (tokenData) {
          const parsedToken = JSON.parse(tokenData);
          if (parsedToken.token) {
            // Navigate to the StoreSelectionScreen if the token exists
            navigation.navigate('StoreSelectionScreen');
          }
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.log('Error checking token:', error);
      }
    };

    if (isFocused) {
      checkToken();
    }
  }, [navigation, isFocused]);

  // Handle the back button action
  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        if (backPressCount === 0) {
          setBackPressCount(1);
          ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
          setTimeout(() => setBackPressCount(0), 2000);
        } else if (backPressCount === 1) {
          BackHandler.exitApp();
        }
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backPressCount, isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#6228d7', '#ee2a7b']}
        style={styles.container}
        start={{x: 0.5, y: 0.5}}
        end={{x: 1, y: 1}}
        locations={[0, 0.5]}>
        <Text style={styles.primaryTitle}>Log In</Text>
        <View style={styles.secondaryTitleContainer}>
          <Text style={{color: '#fff', fontSize: 16}}>New Here?</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                textDecorationLine: 'underline',
              }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputField}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              style={styles.input}
              placeholderTextColor={'#525252'}
              value={inputValue.email}
              onChangeText={value =>
                setInputValue({...inputValue, email: value})
              }
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.input}
              placeholderTextColor={'#525252'}
              secureTextEntry={true}
              value={inputValue.password}
              onChangeText={value =>
                setInputValue({...inputValue, password: value})
              }
            />
          </View>
          <View style={styles.inputField}>
            <TouchableOpacity
              onPress={() => handleLogin()}
              style={styles.loginBtn}>
              <Text style={{color: '#fff', fontWeight: '600'}}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  primaryTitle: {
    fontSize: 35,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  secondaryTitleContainer: {
    width: '100%',
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputField: {
    width: '70%',
    marginBottom: 20,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff91',
    height: 44,
    borderRadius: 99,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  loginBtn: {
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 99,
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Login;
