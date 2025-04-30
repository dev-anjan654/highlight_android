import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={20} style={{color: '#fff'}} />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 22}}>Notifications</Text>
        <View></View>
      </LinearGradient>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.eachNotification}>
            <View style={styles.left}>
              <Image
                source={require('../../assets/profile1.jpg')}
                style={{width: 40, height: 40, borderRadius: 99}}
              />
              <View>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 2,
                  }}>
                  Sudip Maity
                </Text>
                <Text style={{color: '#000', fontSize: 12}}>
                  verified his account
                </Text>
              </View>
            </View>
            <View style={styles.right}>
              <Icon
                name="ellipsis-horizontal"
                size={24}
                style={{color: '#6228d7'}}
              />
              <Text style={{color: '#000', fontSize: 12}}>3m ago</Text>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: 50,
    flexGrow: 1,
  },
  eachNotification: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#a8a8a8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  right: {
    alignItems: 'flex-end',
  },
});

export default NotificationScreen;
