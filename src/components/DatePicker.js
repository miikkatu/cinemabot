import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  datePicker: {
    fontSize: 20,
    margin: 10,
  },
});

export default class DatePicker extends Component {
  render() {
    return (
      <View>
        <Text style={styles.datePicker}>Date Picker</Text>
      </View>
    );
  }
}
