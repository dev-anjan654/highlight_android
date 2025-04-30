import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {fetchAllDetails} from '../../utility/api';
import {useDispatch} from 'react-redux';
import {addBranch} from '../../Store/branchSlice';

const StoreSelectionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0);
  const [error, setError] = useState(''); // New error state

  // Fetch branches
  const getAllBranches = async () => {
    const end_url = 'get_all_branches';
    try {
      setIsLoading(true);
      const result = await fetchAllDetails(end_url);
      setBranches(result?.data?.branches);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Check your connection'); // Set error message
      console.error(error);
    }
  };

  useEffect(() => {
    getAllBranches();
  }, []);

  // Pull to refresh logic
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllBranches().finally(() => {
      setRefreshing(false);
    });
  }, []);

  // Handle branch selection
  const handleBranchSelect = (id, name) => {
    navigation.navigate('BottomTabScreen');
    dispatch(addBranch({id: id, name: name}));
  };

  // Back button handler only when screen is focused
  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        if (backPressCount === 0) {
          setBackPressCount(1);
          ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
          setTimeout(() => setBackPressCount(0), 2000);
        } else if (backPressCount === 1) {
          BackHandler.exitApp();
        }
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backPressCount, isFocused]);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/bg-1.jpg')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f9ce34dc', '#ee2a7cd8']}
          style={styles.innerWrapper}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <View style={styles.storeContainer}>
              <ScrollView>
                {error ? (
                  <Text style={styles.errorText}>{error}</Text> // Display error message
                ) : (
                  <>
                    <Text style={styles.title}>Select Store</Text>
                    <View>
                      {branches?.map(item => (
                        <Pressable
                          onPress={() =>
                            handleBranchSelect(item?.id, item?.branch_name)
                          }
                          key={item?.id}
                          style={styles.eachStore}>
                          <Image
                            source={require('../../assets/store2.jpg')}
                            style={{width: 65, height: 65, borderRadius: 10}}
                          />
                          <View style={styles.info}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '600',
                                fontSize: 16,
                                marginBottom: 5,
                              }}>
                              {item?.branch_name}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                                marginBottom: 2,
                              }}>
                              <Icon
                                name="location-outline"
                                size={16}
                                style={{color: '#000'}}
                              />
                              <Text style={styles.addressText}>
                                {item?.branch_address}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                              }}>
                              <Icon
                                name="call-outline"
                                size={16}
                                style={{color: '#000'}}
                              />
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: '600',
                                  fontSize: 12,
                                }}>
                                {item?.contact_person_no}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      ))}
                    </View>
                  </>
                )}
              </ScrollView>
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
  },
  innerWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeContainer: {
    width: '80%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  eachStore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  info: {
    flex: 1,
  },
  addressText: {
    color: '#000',
    fontSize: 12,
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '90%',
    fontWeight: '600',
  },
  errorText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default StoreSelectionScreen;
