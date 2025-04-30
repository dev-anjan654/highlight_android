import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreenHeader from '../../components/Header/HomeScreenHeader';
import CircularCard from '../../components/CircularCard/CircularCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import BottomSheetComp from '../../components/BottomSheet/BottomSheet';
import {fetchAllDetails} from '../../utility/api';
import GenderModal from '../../components/Modal/GenderModal';
import {useDispatch, useSelector} from 'react-redux';
import {addGender} from '../../Store/genderSlice';
import SubcategoriesList from '../../components/SubcategoriesList/SubcategoriesList';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import Tooltip from '../../components/Tooltip/Tooltip';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bottomSheet = useRef();
  const {branch} = useSelector(state => state.branch);
  const branchId = branch?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGenderId, setSelectedGenderId] = useState(2); // Set to 2 for women
  const [services, setServices] = useState([]);
  const [subCategoriesByCatId, setSubCategoriesByCatId] = useState([]);
  const [selectedCategory, setSelecetedCategory] = useState();

  // Fetch all services
  const getAllServices = async () => {
    const end_url = 'get_services';
    try {
      setIsLoading(true);
      const result = await fetchAllDetails(end_url);
      setServices(result?.data?.services);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Filter services by branchId and genderId
  const servicesByBranchId_gender = services?.filter(
    service =>
      service?.branches?.some(branch => branch?.branch_id == branchId) &&
      service?.gender_id === selectedGenderId,
  );

  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [branches, setBranches] = useState([]);

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

  const fetchCategoryDetails = async () => {
    const end_url = 'get_categories';
    try {
      const result = await fetchAllDetails(end_url);
      setCategories(result?.data?.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  const getAllBranches = async () => {
    const end_url = 'get_all_branches';
    try {
      const result = await fetchAllDetails(end_url);
      setBranches(result?.data?.branches);
    } catch (error) {
      console.error(error);
    }
  };

  const branchbyId = branches?.find(branch => branch?.id == branchId);
  const selectedGender = genders?.find(
    gender => gender?.id === selectedGenderId,
  );

  // Map category names and IDs, filtering out duplicates
  const categoryNamesAndIds = Array.from(
    new Map(
      servicesByBranchId_gender?.map(service => [
        service?.category_id,
        {
          category_name: categories?.find(
            cat => cat?.id === service?.category_id,
          )?.category_name,
          category_id: service?.category_id,
          category_image: categories?.find(
            cat => cat?.id === service?.category_id,
          )?.category_picture,
        },
      ]),
    ).values(),
  );

  const servicesByBranchId = services?.filter(service =>
    service?.branches?.some(branch => branch?.branch_id == branchId),
  );

  // Filter subcategories for women
  const womenSubcategories = servicesByBranchId
    ?.filter(service => service.gender_id === 2)
    ?.map(service => service.subcategory_id)
    ?.filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

  const filteredWomenSubCats = subCategories?.filter(subcat =>
    womenSubcategories?.includes(subcat.id),
  );

  // Filter subcategories for men
  const menSubcategories = servicesByBranchId
    ?.filter(service => service.gender_id === 1)
    ?.map(service => service.subcategory_id)
    ?.filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

  const filteredMenSubCats = subCategories?.filter(subcat =>
    menSubcategories?.includes(subcat.id),
  );

  // Filter subcategories for kids
  const kidsSubcategories = servicesByBranchId
    ?.filter(service => service.gender_id === 3)
    ?.map(service => service.subcategory_id)
    ?.filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

  const filteredKidsSubCats = subCategories?.filter(subcat =>
    kidsSubcategories?.includes(subcat.id),
  );

  useEffect(() => {
    getAllServices();
    getAllGenders();
    fetchCategoryDetails();
    getAllBranches();
    fetchSubcategoryDetails();
  }, []);

  const handleGenderSelect = (id, name) => {
    setSelectedGenderId(id);
    setModalVisible(false);
  };

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

  const handleSubcategory = (subcategoryId, genderId) => {
    navigation.navigate('ServiceScreen', {subcategoryId});
    const genderName = genders?.find(gender => gender?.id === genderId);
    dispatch(addGender({id: genderId, name: genderName?.gender_name}));
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getAllServices();
    await getAllGenders();
    await fetchCategoryDetails();
    await getAllBranches();
    await fetchSubcategoryDetails();
    setIsRefreshing(false);
  };

  // Function to dynamically set justifyContent
  const getCategoryListJustifyContent = () => {
    return categoryNamesAndIds.length >= 4 ? 'space-between' : 'flex-start';
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <HomeScreenHeader />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#ee2a7b'} size={'large'} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.mainContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginBottom: 15,
              }}>
              <Icon
                name="location-outline"
                size={22}
                style={{color: '#525252'}}
              />
              <Text style={{color: '#000', fontWeight: '600'}}>
                {branchbyId?.branch_name}
              </Text>
              <Pressable onPress={() => navigation.goBack()}>
                <Text style={{color: '#6228d7', fontWeight: '700'}}>
                  Change
                </Text>
              </Pressable>
            </View>
            <View style={styles.categoryContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}>
                <Text
                  style={{fontSize: 16, color: '#525252', fontWeight: '600'}}>
                  {selectedGender?.gender_name}
                </Text>
                <View style={{position: 'relative'}}>
                  <Tooltip />
                  <Pressable onPress={() => setModalVisible(true)}>
                    <Icon
                      name="menu-outline"
                      size={35}
                      style={{color: '#525252'}}
                    />
                  </Pressable>
                </View>
              </View>
              <View
                style={[
                  styles.categoriesList,
                  {justifyContent: getCategoryListJustifyContent()},
                ]}>
                {categoryNamesAndIds.slice(0, 7).map((category, index) => (
                  <Pressable
                    onPress={() =>
                      handleCategory(
                        category?.category_id,
                        category?.category_name,
                      )
                    }
                    key={index}
                    style={styles.categoryItem}>
                    <CircularCard
                      type="category"
                      image={category?.category_image}
                    />
                    <Text style={styles.categoryName}>
                      {category?.category_name}
                    </Text>
                  </Pressable>
                ))}
                {categoryNamesAndIds?.length > 7 && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('CategoryScreen', {
                        categoryNamesAndIds,
                        selectedGenderId,
                      })
                    }
                    style={styles.categoryItem}>
                    <CircularCard type="showAll" />
                    <Text style={styles.categoryName}>Show All</Text>
                  </Pressable>
                )}
              </View>
            </View>

            {/* Slider */}
            <HomeSlider />

            {/* Salon for Women */}
            <SubcategoriesList
              subCategories={filteredWomenSubCats}
              genderId={2}
              handleSubcategory={handleSubcategory}
            />

            {/* Salon for Men */}
            <SubcategoriesList
              subCategories={filteredMenSubCats}
              genderId={1}
              handleSubcategory={handleSubcategory}
            />

            {/* Salon for kids */}
            <SubcategoriesList
              subCategories={filteredKidsSubCats}
              genderId={3}
              handleSubcategory={handleSubcategory}
            />
          </View>
        </ScrollView>
      )}
      <GenderModal
        allGenders={genders}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onGenderSelect={handleGenderSelect}
      />
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
    marginTop: 120,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  categoryContainer: {
    //paddingHorizontal: 10,
    marginBottom: 30,
  },
  categoriesList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  categoryItem: {
    width: 'auto',
    alignItems: 'center',
    overflow: 'hidden',
    maxWidth: 80,
  },
  categoryName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    width: '100%',
    marginBottom: 18,
  },
});

export default HomeScreen;
