import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import HomeScreenHeader from '../../components/Header/HomeScreenHeader';
import BottomSheetComp from '../../components/BottomSheet/BottomSheet';
import {BASE_URL, fetchAllDetails} from '../../utility/api';
import {useDispatch, useSelector} from 'react-redux';
import {addGender} from '../../Store/genderSlice';
import categoryPlaceholder from '../../assets/categoryIcon.png';
import LinearGradient from 'react-native-linear-gradient';

const CategoryScreen = () => {
  const dispatch = useDispatch();
  const bottomSheet = useRef();
  const route = useRoute();
  const {categoryNamesAndIds, selectedGenderId} = route.params;
  const [services, setServices] = useState([]);
  const [genders, setGenders] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesByCatId, setSubCategoriesByCatId] = useState([]);
  const [selectedCategory, setSelecetedCategory] = useState();

  const {branch} = useSelector(state => state.branch);
  const branchId = branch?.id;

  // Fetch all services
  const getAllServices = async () => {
    const end_url = 'get_services';
    try {
      const result = await fetchAllDetails(end_url);
      setServices(result?.data?.services);
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch various data
  const getAllGenders = async () => {
    const end_url = 'get_genders';
    try {
      const result = await fetchAllDetails(end_url);
      setGenders(result?.data?.genders);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubcategoryDetails = async () => {
    const end_url = 'get_all_sub_categories';
    try {
      const result = await fetchAllDetails(end_url);
      setSubCategories(result?.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    getAllServices();
    getAllGenders();
    fetchSubcategoryDetails();
  }, []);

  // Filter services by branchId and genderId
  const servicesByBranchId_gender = services?.filter(
    service =>
      service?.branches?.some(branch => branch?.branch_id == branchId) &&
      service?.gender_id === selectedGenderId,
  );

  const selectedGender = genders?.find(
    gender => gender?.id === selectedGenderId,
  );

  const handleCategory = (id, name) => {
    bottomSheet.current.show();

    // Filter services by selected category and gender
    const filteredServices = servicesByBranchId_gender.filter(
      service => service?.category_id === id,
    );

    // Get subcategory IDs from filtered services
    const serviceSubcategoryIds = filteredServices.map(
      service => service?.subcategory_id,
    );

    // Filter subcategories that are in the filtered services
    const filteredSubCats = subCategories.filter(subcat =>
      serviceSubcategoryIds.includes(subcat.id),
    );

    setSubCategoriesByCatId(filteredSubCats);
    setSelecetedCategory(name);
    dispatch(
      addGender({id: selectedGenderId, name: selectedGender?.gender_name}),
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeScreenHeader />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          {categoryNamesAndIds?.map((category, index) => (
            <Pressable
              onPress={() =>
                handleCategory(category?.category_id, category?.category_name)
              }
              key={index}
              style={styles.categoryItem}>
              <LinearGradient
                colors={['#ee2a7b', '#6228d7']}
                style={styles.cardStyle}>
                <Image
                  source={
                    category?.category_image !== null
                      ? {
                          uri: `${BASE_URL}/api/get_categories/${category?.category_image}`,
                        }
                      : categoryPlaceholder
                  }
                  style={{width: 60, height: 60}}
                />
              </LinearGradient>
              <Text style={styles.categoryName}>{category.category_name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <BottomSheetComp
        ref={bottomSheet}
        data={subCategoriesByCatId}
        title={selectedCategory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    marginTop: 110,
  },
  mainContainer: {
    height: '100%',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  categoryItem: {
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    elevation: 2,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#525252',
  },
  cardStyle: {
    width: 60,
    height: 60,
    borderRadius: 99,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryScreen;
