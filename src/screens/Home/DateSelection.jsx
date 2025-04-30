import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Calendar from 'react-native-calendars/src/calendar';
import moment from 'moment';
import BottomTab from '../../components/BottomTab/BottomTab';
import {addBookingDate} from '../../Store/bookingDateSlice';

const DateSelection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {branch} = useSelector(state => state.branch);
  const today = moment();
  const currentDate = today.format('YYYY-MM-DD');
  //const maxDate = today.add(7, 'days').format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Handler for day press
  const handleDayPress = date => {
    setSelectedDate(date.dateString);
    dispatch(addBookingDate({date: date.dateString}));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Header */}
      <LinearGradient colors={['#ee2a7b', '#6228d7']} style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-circle-outline"
            size={24}
            style={{color: '#fff'}}
          />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
          {branch.name}
        </Text>
      </LinearGradient>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          initialDate={currentDate}
          minDate={currentDate}
          //maxDate={maxDate}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#ee2a7b',
              selectedTextColor: '#fff',
            },
          }}
        />
        <BottomTab title="Checkout" screen={'FinalBookingScreen'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  container: {
    flex: 1,
  },
  calendar: {
    elevation: 3,
    margin: 10,
    borderRadius: 8,
  },
});

export default DateSelection;
