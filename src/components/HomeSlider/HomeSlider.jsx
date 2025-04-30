import React, {useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';

const HomeSlider = () => {
  const swiperRef = useRef(null);
  return (
    <View style={styles.swiperContainer}>
      <Swiper
        ref={swiperRef}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
        loop={true}
        autoplay={true}>
        <Image
          style={styles.swiperImage}
          source={require('../../assets/slider/slider1.jpg')}
        />
        <Image
          style={styles.swiperImage}
          source={require('../../assets/slider/slider2.jpg')}
        />
        <Image
          style={styles.swiperImage}
          source={require('../../assets/slider/slider3.jpg')}
        />
        <Image
          style={styles.swiperImage}
          source={require('../../assets/slider/slider4.jpg')}
        />
        <Image
          style={styles.swiperImage}
          source={require('../../assets/slider/slider5.jpg')}
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    height: 120,
    marginBottom: 30,
  },
  swiperImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dot: {
    backgroundColor: '#0000007c',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  pagination: {
    bottom: -20,
  },
});

export default HomeSlider;
