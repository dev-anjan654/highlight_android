import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {registerApp, sendOTP, verifyOTP} from '../../utility/api';

const Signup = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    mob_no: '',
    otp: '',
    password: '',
    cnf_password: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const handleSignup = async () => {
    const body = {
      first_name: inputValue.name,
      email: inputValue.email,
      phone_number: `+91${inputValue.mob_no}`,
      password: inputValue.password,
      confirm_password: inputValue.cnf_password,
      otp_code: inputValue.otp,
    };
    try {
      const result = await registerApp(body);
      if (result?.status == 200) {
        ToastAndroid.show('Successfully registerd', ToastAndroid.LONG);
        navigation.navigate('Login');
      } else {
        ToastAndroid.show(result.response.data.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    }
  };

  //get & resend OTP
  const handleOtp = async () => {
    if (inputValue.mob_no === '') {
      ToastAndroid.show('Please enter mobile no.', ToastAndroid.SHORT);
      return;
    }
    if (inputValue.mob_no.length < 10) {
      ToastAndroid.show('Enter Valid Mobile No', ToastAndroid.SHORT);
      return;
    }
    const body = {phone_number: `+91${inputValue.mob_no}`};
    try {
      const result = await sendOTP(body);
      if (result?.status == 200) {
        setOtpSent(true);
        setTimer(60);
        ToastAndroid.show(
          `OTP successfully sent to ${body.phone_number}`,
          ToastAndroid.LONG,
        );
      } else {
        ToastAndroid.show(result.response.data.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    }
  };

  const otpVerifyHandler = async () => {
    if (inputValue.otp === '') {
      ToastAndroid.show('Please enter OTP', ToastAndroid.SHORT);
      return;
    }
    const body = {
      phone_number: `+91${inputValue.mob_no}`,
      otp_code: inputValue.otp,
    };
    try {
      const result = await verifyOTP(body);
      if (result?.status == 200) {
        ToastAndroid.show('Verified', ToastAndroid.LONG);
        setOtpVerified(true);
      } else {
        ToastAndroid.show(result.response.data.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Server Error', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#6228d7', '#ee2a7b']}
        style={styles.gradient}
        start={{x: 0.5, y: 0.5}}
        end={{x: 1, y: 1}}
        locations={[0, 0.5]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.primaryTitle}>Create Account</Text>
          <View style={styles.secondaryTitleContainer}>
            <Text style={{color: '#fff', fontSize: 16}}>
              Already Registered?
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                Login here
              </Text>
            </Pressable>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputField}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder="Enter Name"
                style={styles.input}
                placeholderTextColor={'#000'}
                value={inputValue.name}
                onChangeText={value =>
                  setInputValue({...inputValue, name: value})
                }
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Email ID</Text>
              <TextInput
                placeholder="Email Id"
                style={styles.input}
                placeholderTextColor={'#000'}
                value={inputValue.email}
                onChangeText={value =>
                  setInputValue({...inputValue, email: value})
                }
              />
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Mobile No.</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="Mobile No."
                  style={[styles.input, {width: '68%'}]}
                  placeholderTextColor={'#000'}
                  value={inputValue.mob_no}
                  maxLength={10}
                  keyboardType="numeric"
                  onChangeText={value =>
                    setInputValue({...inputValue, mob_no: value})
                  }
                />
                {!otpVerified && (
                  <TouchableOpacity
                    onPress={handleOtp}
                    style={styles.greenBtn}
                    disabled={timer > 0}>
                    <Text style={{fontWeight: '600', color: '#fff'}}>
                      {timer > 0
                        ? `00 : ${timer < 10 ? `0${timer}` : timer}`
                        : otpSent
                        ? 'Resend'
                        : 'Get OTP'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Enter OTP</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="OTP"
                  style={[styles.input, {width: '68%'}]}
                  placeholderTextColor={'#000'}
                  value={inputValue.otp}
                  keyboardType="numeric"
                  onChangeText={value =>
                    setInputValue({...inputValue, otp: value})
                  }
                />
                {!otpVerified ? (
                  <TouchableOpacity
                    onPress={otpVerifyHandler}
                    style={styles.greenBtn}>
                    <Text style={{fontWeight: '600', color: '#fff'}}>
                      Verify
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{color: '#fff'}}>OTP Verified</Text>
                )}
              </View>
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Password"
                style={styles.input}
                placeholderTextColor={'#000'}
                value={inputValue.password}
                onChangeText={value =>
                  setInputValue({...inputValue, password: value})
                }
              />
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                placeholderTextColor={'#000'}
                value={inputValue.cnf_password}
                onChangeText={value =>
                  setInputValue({...inputValue, cnf_password: value})
                }
              />
            </View>

            <View style={styles.inputField}>
              <TouchableOpacity
                onPress={() => handleSignup()}
                style={styles.signupBtn}>
                <Text style={{color: '#fff', fontWeight: '600'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View
            style={{alignItems: 'center', width: '100%', marginVertical: 30}}>
            <View style={styles.devider}>
              <View
                style={{
                  width: '40%',
                  height: 2,
                  backgroundColor: '#000',
                }}></View>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
                OR
              </Text>
              <View
                style={{
                  width: '40%',
                  height: 2,
                  backgroundColor: '#000',
                }}></View>
            </View>
          </View> */}
          {/* <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.googleLogin}>
              <Image
                source={require('../../assets/google.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={{color: '#000', fontWeight: '600'}}>
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingBottom: 30, // Added padding bottom
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  primaryTitle: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryTitleContainer: {
    width: '100%',
    marginVertical: 20,
    marginTop: 10,
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
    width: '80%',
    marginBottom: 18,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff91',
    height: 40,
    borderRadius: 99,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000',
  },
  greenBtn: {
    backgroundColor: 'green',
    height: 40,
    borderRadius: 99,
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupBtn: {
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 99,
    marginTop: 15,
  },
  googleLogin: {
    width: 180,
    height: 35,
    backgroundColor: '#ffffff91',
    borderRadius: 99,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
  },
});

export default Signup;
