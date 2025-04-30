import React, {useEffect, useRef} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingScreen = () => {
  const swiperRef = useRef(null);
  const navigation = useNavigation();

  const handleForwardPress = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem('hasLaunched', 'true');
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Swiper
        ref={swiperRef}
        style={styles.swiperWrapper}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}>
        <View>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../assets/bg-1.jpg')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#f9ce349f', '#ee2a7cc0']}
              style={styles.innerWrapper}>
              <Image
                source={require('../../assets/logo.png')}
                style={{width: '80%', height: 200, marginTop: 150}}
              />
              <Text style={styles.secondaryTitle}>
                A simple explanation to the {'\n'}audience regarding the
                headline
              </Text>
              <View style={styles.navigationContainer}>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: '#fff', fontSize: 16}}>Skip</Text>
                </Pressable>
                <Pressable
                  style={styles.forwardBtn}
                  onPress={handleForwardPress}>
                  <Icon
                    name="chevron-forward-outline"
                    size={26}
                    style={{color: '#fff'}}
                  />
                </Pressable>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../assets/bg-2.jpg')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#f9ce349f', '#ee2a7cc0']}
              style={styles.innerWrapper}>
              <Image
                source={require('../../assets/logo.png')}
                style={{width: '80%', height: 200, marginTop: 150}}
              />
              <Text style={styles.secondaryTitle}>
                A simple explanation to the {'\n'}audience regarding the
                headline
              </Text>
              <View style={styles.navigationContainer}>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: '#fff', fontSize: 16}}>Skip</Text>
                </Pressable>
                <Pressable
                  style={styles.forwardBtn}
                  onPress={handleForwardPress}>
                  <Icon
                    name="chevron-forward-outline"
                    size={26}
                    style={{color: '#fff'}}
                  />
                </Pressable>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../assets/bg-3.jpg')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#f9ce349f', '#ee2a7cc0']}
              style={styles.innerWrapper}>
              <Image
                source={require('../../assets/logo.png')}
                style={{width: '80%', height: 200, marginTop: 150}}
              />
              <Text style={styles.secondaryTitle}>
                A simple explanation to the {'\n'}audience regarding the
                headline
              </Text>
              <View style={styles.navigationContainer}>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: '#fff', fontSize: 16}}>Skip</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('Login')}
                  style={styles.forwardBtn}>
                  <Icon
                    name="chevron-forward-outline"
                    size={26}
                    style={{color: '#fff'}}
                  />
                </Pressable>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  swiperWrapper: {},
  imageBackground: {
    height: '100%',
  },
  primaryTitle: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 200,
    color: '#fff',
  },
  innerWrapper: {
    height: '100%',
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  secondaryTitle: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    bottom: 150,
    left: 40,
    lineHeight: 25,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  forwardBtn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#487fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#ffffff91',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 3,
  },
  pagination: {
    bottom: 100,
    left: -240,
  },
});

export default LandingScreen;
