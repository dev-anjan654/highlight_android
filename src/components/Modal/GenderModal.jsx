import React from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CircularCard from '../CircularCard/CircularCard';

const GenderModal = ({
  isModalVisible,
  setModalVisible,
  allGenders,
  onGenderSelect,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!isModalVisible);
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.closeIcon}>
            <Icon
              name="close-circle-outline"
              size={22}
              style={{color: '#000'}}
            />
          </Pressable>
          {allGenders?.map((gender, index) => (
            <Pressable
              key={index}
              style={styles.eachGender}
              onPress={() => onGenderSelect(gender?.id, gender?.gender_name)}>
              <CircularCard type="gender" gender={gender?.gender_name} />
              <Text style={styles.modalButtonText}>{gender?.gender_name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eachGender: {
    width: 'auto',
    marginBottom: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalButtonText: {
    color: '#000',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 99,
  },
});

export default GenderModal;
