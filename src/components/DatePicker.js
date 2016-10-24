import React, { Component, PropTypes } from 'react';
import { DatePickerIOS, View } from 'react-native';

export default class DatePicker extends Component {
  render() {
    return (
      <View>
        <DatePickerIOS
          date={this.props.selectedDate}
          mode="datetime"
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
