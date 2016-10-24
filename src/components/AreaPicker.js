import React, { Component, PropTypes } from 'react';
import { Picker, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#fff',
  },
  pickerItem: {
    color: '#000',
  },
});

export default class AreaPicker extends Component {
  state = {
    selectedAreaID: '1019',
  };

  render() {
    return (
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={(this.props && this.props.selectedAreaID) || '1019'}
        onValueChange={this.props.onValueChange}
      >
        {this.props.areas.map((area, i) =>
          <Picker.Item key={i} label={area.Name} value={area.ID} />
        )}
      </Picker>
    );
  }
}

AreaPicker.propTypes = {
  areas: PropTypes.array,
  onValueChange: PropTypes.func,
  selectedAreaID: PropTypes.string,
};
