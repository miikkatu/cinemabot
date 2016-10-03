import React, { Component, PropTypes } from 'react';
import { DatePickerIOS, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  datePicker: {
    fontSize: 16,
  },
});

export default class DatePicker extends Component {
  render() {
    return (
      <View>
        <DatePickerIOS
          date={this.props.selectedDate}
          mode="date"
          onDateChange={this.props.onDateChange}
        />
      </View>
    );
  }
}

DatePicker.propTypes = {
  onDateChange: PropTypes.func,
  selectedDate: PropTypes.object,
};
