import React, { Component, PropTypes } from 'react';
import { Picker, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  areaPicker: {
  },
  picker: {
  },
});

export default class AreaPicker extends Component {
  state = {
    selectedAreaID: '1019',
  };
  render() {
    return (
      <View style={styles.areaPicker}>
        <Picker
          style={styles.picker}
          selectedValue={(this.props && this.props.selectedAreaID) || '1019'}
          onValueChange={this.props.onValueChange}
        >
          {this.props.areas.map((area, i) =>
            <Picker.Item key={i} label={area.Name} value={area.ID} />
          )}
        </Picker>
      </View>
    );
  }
}

AreaPicker.propTypes = {
  areas: PropTypes.array,
  onValueChange: PropTypes.func,
  selectedAreaID: PropTypes.string,
};
