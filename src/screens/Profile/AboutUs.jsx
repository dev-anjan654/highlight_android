import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutUs = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={20} style={{color: '#fff'}} />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 22}}>About Us</Text>
        <View></View>
      </LinearGradient>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            marginBottom: 40,
            fontWeight: '500',
            letterSpacing: 0.3,
            lineHeight: 25,
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          consequatur at dolorum odio libero, assumenda mollitia ipsa beatae
          nulla velit! Doloremque dolore blanditiis ullam. Non asperiores
          voluptates sed eum maxime maiores ipsam laboriosam deleniti dolor
          assumenda aperiam recusandae, dolore minima quibusdam sint aut dolores
          blanditiis incidunt! Recusandae aliquam possimus, neque natus harum
          accusamus iure quia molestiae minima facere atque asperiores omnis ad
          deleniti suscipit voluptatem praesentium autem exercitationem optio
          dicta sit.
        </Text>
        <View>
          <Image
            source={require('../../assets/logo2.png')}
            style={{width: 80, height: 80}}
          />
          <Text style={{color: '#000', fontSize: 25}}>7.5.67</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default AboutUs;
