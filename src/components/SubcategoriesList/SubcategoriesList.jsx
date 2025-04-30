import React, {useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import gridIcon from '../../assets/grid.png';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from '../../utility/api';
import subcatPlaceholder from '../../assets/subCat.jpg';

const SubcategoriesList = ({subCategories, genderId, handleSubcategory}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleSubCategories = showAll
    ? subCategories
    : subCategories?.slice(0, 5);

  return (
    <View style={styles.subcatContainer}>
      <Text style={styles.genderTitle}>
        {genderId === 2
          ? 'Salon for Women'
          : genderId === 1
          ? 'Salon for Men'
          : 'Salon for Kids'}
      </Text>
      <View style={styles.subCategoriesList}>
        {visibleSubCategories?.map((subCategory, index) => (
          <Pressable
            onPress={() => handleSubcategory(subCategory?.id, genderId)}
            key={index}
            style={styles.categoryItem}>
            <Image
              source={
                subCategory?.sub_category_picture !== null
                  ? {
                      uri: `${BASE_URL}/api/get_all_sub_categories/${subCategory?.sub_category_picture}`,
                    }
                  : subcatPlaceholder
              }
              style={styles.subCategoryImage}
            />
            <Text
              style={styles.categoryName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {subCategory?.sub_category_name}
            </Text>
          </Pressable>
        ))}
        {subCategories?.length > 5 && (
          <Pressable
            onPress={() => setShowAll(!showAll)}
            style={styles.showMoreButton}>
            <LinearGradient
              colors={['#ee2a7b', '#6228d7']}
              style={styles.wrapper}>
              <Image
                source={gridIcon}
                style={{width: '100%', height: '100%'}}
              />
            </LinearGradient>
            <Text style={styles.showMoreText}>
              {showAll ? 'Show Less' : 'Show All'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subcatContainer: {
    //paddingHorizontal: 10,
    marginBottom: 30,
  },
  genderTitle: {
    fontSize: 16,
    color: '#525252',
    fontWeight: '600',
    marginBottom: 15,
  },
  subCategoriesList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  categoryItem: {
    width: 'auto',
    alignItems: 'center',
    overflow: 'hidden',
    maxWidth: 85,
  },
  subCategoryImage: {
    width: 85,
    height: 85,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
  showMoreButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  wrapper: {
    width: 85,
    height: 85,
    borderRadius: 8,
    padding: 10,
  },
  showMoreText: {
    color: '#000',
    fontSize: 12,
  },
});

export default SubcategoriesList;
