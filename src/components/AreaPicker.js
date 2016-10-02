import React, { Component, PropTypes } from 'react';
import { Picker, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const styles = StyleSheet.create({
  areaPicker: {
  },
  picker: {
  },
  pickButton: {
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default class AreaPicker extends Component {
  state = {
    selectedAreaID: '1019',
  };

  toggleArea = () => {
  }

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
        <TouchableHighlight onPress={this.props.onPickArea}>
          <Text style={styles.pickButton}>Valitse</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

AreaPicker.propTypes = {
  areas: PropTypes.array,
  onPickArea: PropTypes.func,
  onValueChange: PropTypes.func,
  selectedAreaID: PropTypes.string,
};
