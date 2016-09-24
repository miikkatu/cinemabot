import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  areaPicker: {
    fontSize: 16,
  },
});

export default class AreaPicker extends Component {
  render() {
    return (
      <View>
        <Text style={styles.areaPicker}>Area Picker: {this.props.persistedTheater}</Text>
      </View>
    );
  }
}

AreaPicker.propTypes = {
  persistedTheater: PropTypes.string,
};
