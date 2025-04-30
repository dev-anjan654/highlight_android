import {useNavigation} from '@react-navigation/native';
import React, {forwardRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {BASE_URL} from '../../utility/api';
import subcatPlaceholder from '../../assets/subCat.jpg';

const BottomSheetComp = forwardRef((props, ref) => {
  const {data, title} = props;
  const navigation = useNavigation();
  const handleSubcategory = subcategoryId => {
    ref.current.close();
    navigation.navigate('ServiceScreen', {subcategoryId});
  };

  return (
    <BottomSheet hasDraggableIcon ref={ref} height={200}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <ScrollView horizontal>
          <View style={styles.subcatContainer}>
            {data?.map((item, index) => {
              return (
                <Pressable
                  onPress={() => handleSubcategory(item?.id)}
                  key={index}
                  style={styles.subcategoryItem}>
                  <Image
                    source={
                      item?.sub_category_picture !== null
                        ? {
                            uri: `${BASE_URL}/api/get_all_sub_categories/${item?.sub_category_picture}`,
                          }
                        : subcatPlaceholder
                    }
                    style={{width: 80, height: 80, borderRadius: 10}}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.subCategoryName}>
                    {item?.sub_category_name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  subcatContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flexWrap: 'wrap',
  },
  subcategoryItem: {
    width: 'auto',
    alignItems: 'center',
    overflow: 'hidden',
    maxWidth: 85,
  },
  subCategoryName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
});

export default BottomSheetComp;
