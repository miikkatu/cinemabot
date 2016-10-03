import React, { Component, PropTypes } from 'react';
import { DatePickerIOS, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const styles = StyleSheet.create({
  datePicker: {
    fontSize: 16,
  },
});

export default class DatePicker extends Component {
  render() {
    return (
      <View>
        <Text style={styles.datePicker}>Date Picker</Text>
        <DatePickerIOS
          date={this.props.selectedDate}
          mode="date"
          onDateChange={this.props.onValueChange}
        />
        <TouchableHighlight onPress={this.props.onPickDate}>
          <Text style={styles.pickButton}>Valitse</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

DatePicker.propTypes = {
  onPickDate: PropTypes.func,
  onValueChange: PropTypes.func,
  selectedDate: PropTypes.object,
};
