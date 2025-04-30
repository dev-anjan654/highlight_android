import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import BottomTab from '../../components/BottomTab/BottomTab';
import {fetchAllDetails} from '../../utility/api';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const ServiceScreen = () => {
  const {gender} = useSelector(state => state.gender);
  const cartList = useSelector(state => state.cart.cartDetails);
  const {branch} = useSelector(state => state.branch);
  const route = useRoute();
  const {subcategoryId} = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  //filter cartList based on user and branch
  const filteredCartList = cartList?.filter(
    item => item?.branch_id === branch?.id,
  );

  const [subCategories, setSubCategories] = useState([]);
  // Fetch subcategory details
  const fetchSubcategoryDetails = async () => {
    const end_url = 'get_all_sub_categories';
    try {
      //setIsLoading(true);
      const result = await fetchAllDetails(end_url);
      setSubCategories(result?.data);
      //setIsLoading(false);
    } catch (error) {
      //setIsLoading(false);
      console.error('Error fetching subcategories:', error);
    }
  };

  const [services, setServices] = useState([]);
  // Fetch all services
  const getAllServices = async () => {
    const end_url = 'get_services';
    try {
      setIsLoading(true);
      const result = await fetchAllDetails(end_url);
      setServices(result?.data?.services);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubcategoryDetails();
    getAllServices();
  }, []);
  const subCategoryById = subCategories?.find(
    subcat => subcat?.id === subcategoryId,
  );

  const servicesBysubcatId_genderId = services?.filter(
    service =>
      service?.subcategory_id == subcategoryId &&
      service?.gender_id === gender.id,
  );

  //pul to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllServices().finally(() => {
      setRefreshing(false); // Stop refreshing after data is fetched
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', top: 15, left: 20, zIndex: 99}}>
          <Icon name="arrow-back-outline" size={24} style={{color: '#fff'}} />
        </Pressable>
        {/* Fixed Image at the top */}
        <Image
          source={require('../../assets/scissors.jpg')} // Replace with your image URL or local image
          style={styles.fixedImage}
        />

        {/* Scrollable Content */}
        {isLoading ? (
          <ActivityIndicator color={'#ee2a7b'} size={'large'} />
        ) : (
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.content}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 22,
                  fontWeight: '600',
                  marginBottom: 15,
                }}>
                {subCategoryById?.sub_category_name}
              </Text>

              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                  marginBottom: 10,
                }}>
                <Icon name="star" size={16} style={{color: 'orange'}} />
                <Text style={{color: '#000', fontSize: 12, fontWeight: '600'}}>
                  4.84(2.5k Bookings)
                </Text>
              </View> */}

              {/* <ScrollView horizontal style={{marginBottom: 20}}>
                <View style={styles.cashbackCard}>
                  <Icon name="pricetag" size={12} style={{color: 'red'}} />
                  <Text style={{color: '#000', fontSize: 8}}>
                    CRED Cashback upto Rs 200*
                  </Text>
                </View>
                <View style={styles.cashbackCard}>
                  <Icon name="pricetag" size={12} style={{color: 'red'}} />
                  <Text style={{color: '#000', fontSize: 8}}>
                    CRED Cashback upto Rs 200*
                  </Text>
                </View>
                <View style={styles.cashbackCard}>
                  <Icon name="pricetag" size={12} style={{color: 'red'}} />
                  <Text style={{color: '#000', fontSize: 8}}>
                    CRED Cashback upto Rs 200*
                  </Text>
                </View>
              </ScrollView> */}

              <View style={styles.serviceContainer}>
                {servicesBysubcatId_genderId?.map((item, index) => {
                  return <ServiceCard item={item} key={index} />;
                })}
              </View>
            </View>
          </ScrollView>
        )}
        {filteredCartList?.length > 0 && (
          <BottomTab title="Select Date" screen="DateSelection" />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedImage: {
    width: width,
    height: 200, // Set the height of the image as needed
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scrollView: {
    marginTop: 200, // The same as the height of the image
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  cashbackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    width: 130,
    height: 'auto',
    padding: 2,
    borderRadius: 99,
    marginRight: 10,
  },
  serviceContainer: {},
});

export default ServiceScreen;
