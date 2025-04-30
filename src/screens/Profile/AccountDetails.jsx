import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const AccountDetails = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={20} style={{color: '#fff'}} />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 24}}>Account Details</Text>
        <View></View>
      </LinearGradient>
      <View style={styles.container}>
        <View style={styles.inputField}>
          <Text style={styles.label}>enter new password</Text>
          <TextInput
            placeholder="New Password"
            placeholderTextColor={'#000'}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>confirm new password</Text>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={'#000'}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>OTP</Text>
          <TextInput
            placeholder="OTP"
            placeholderTextColor={'#000'}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={{color: '#fff', fontWeight: '600'}}>Submit</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#e4e4e4',
    color: '#000',
    borderRadius: 99,
    paddingHorizontal: 15,
  },
  label: {
    color: '#000',
    fontSize: 16,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  submitBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    marginTop: 15,
  },
});

export default AccountDetails;
