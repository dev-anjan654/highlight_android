import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import gridIcon from '../../assets/grid.png';
import womenLogo from '../../assets/Category/women.png';
import menLogo from '../../assets/menIcon.png';
import kidsLogo from '../../assets/kidsIcon.png';
import categoryPlaceholder from '../../assets/categoryIcon.png';
import {BASE_URL} from '../../utility/api';

const CircularCard = ({type, image, gender}) => {
  // Determine the image source based on the type
  const getImageSource = () => {
    if (type === 'showAll') {
      return gridIcon;
    }
    if (type === 'category') {
      return image !== null
        ? {uri: `${BASE_URL}/api/get_categories/${image}`}
        : categoryPlaceholder;
    }
    if (type === 'gender') {
      switch (gender) {
        case 'Men':
          return menLogo;
        case 'Women':
          return womenLogo;
        case 'Kids':
          return kidsLogo;
      }
    }
  };

  // Style the component based on the type
  const cardStyle = [
    styles.baseStyle,
    type === 'gender' ? styles.genderStyle : {},
    type === 'category' ? styles.categoryStyle : {},
    type === 'showAll' ? styles.showAllStyle : {},
  ];

  return (
    <LinearGradient colors={['#ee2a7b', '#6228d7']} style={cardStyle}>
      <Image
        source={getImageSource()}
        style={styles.imageStyle}
        resizeMode="contain" // Ensure the image fits well
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    alignItems: 'center',
    borderRadius: 99,
    padding: 5,
    overflow: 'hidden',
  },
  genderStyle: {
    width: 70,
    height: 70,
  },
  categoryStyle: {
    width: 65,
    height: 65,
    overflow: 'hidden',
  },
  showAllStyle: {
    width: 60,
    height: 60,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
});

export default CircularCard;
