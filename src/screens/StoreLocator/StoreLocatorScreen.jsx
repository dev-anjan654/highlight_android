import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeScreenHeader from '../../components/Header/HomeScreenHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {BASE_URL, fetchAllDetails} from '../../utility/api';

const StoreLocatorScreen = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
      console.error(error);
    }
  };

  useEffect(() => {
    getAllBranches();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllBranches().finally(() => {
      setRefreshing(false); // Stop refreshing after data is fetched
    });
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', position: 'relative'}}>
      <HomeScreenHeader />
      {isLoading ? (
        <ActivityIndicator size="large" color="#ee2a7b" />
      ) : (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text
            style={{
              color: '#525252',
              fontSize: 20,
              fontWeight: '600',
              marginBottom: 15,
              marginLeft: 20,
            }}>
            Store Locator
          </Text>

          {branches?.map(branch => {
            return (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#a8a8a8',
                  marginBottom: 20,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                }}
                key={branch?.id}>
                <Image
                  source={
                    branch?.branch_picture === null
                      ? require('../../assets/defaultStore.png')
                      : {
                          uri: `${BASE_URL}/api/get_all_branches/${branch?.branch_picture}`,
                        }
                  }
                  style={styles.storeImage}
                />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20,
                    fontWeight: '600',
                    marginBottom: 8,
                  }}>
                  {branch?.branch_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    marginBottom: 8,
                  }}>
                  <Icon name="location" size={20} style={{color: '#6228d7'}} />
                  <Text style={{color: '#000', fontSize: 16}}>
                    {branch?.branch_address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    marginBottom: 8,
                  }}>
                  <Icon name="call" size={20} style={{color: 'green'}} />
                  <Text style={{color: '#000', fontSize: 16}}>
                    {branch?.contact_person_no}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#fff',
    paddingBottom: 30,
    marginTop: 120,
  },
  storeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default StoreLocatorScreen;
