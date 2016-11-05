import React, { Component, PropTypes } from 'react';
import { DatePickerIOS, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#fff',
  },
});

export default class DatePicker extends Component {
  render() {
    return (
      <DatePickerIOS
        style={styles.picker}
        date={this.props.selectedDate}
        minimumDate={new Date()}
        mode="datetime"
        onDateChange={this.props.onDateChange}
      />
    );
  }
}

DatePicker.propTypes = {
  onDateChange: PropTypes.func,
  selectedDate: PropTypes.object,
};
