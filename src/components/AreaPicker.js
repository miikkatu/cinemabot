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
    persistedTheaterID: '1019',
  };
  render() {
    return (
      <View style={styles.areaPicker}>
        <Picker
          style={styles.picker}
          selectedValue={(this.props && this.props.persistedTheaterID) || '1019'}
          onValueChange={this.props.onValueChange}
        >
          {this.props.theatres.map((theatre, i) =>
            <Picker.Item key={i} label={theatre.Name} value={theatre.ID} />
          )}
        </Picker>
      </View>
    );
  }
}

AreaPicker.propTypes = {
  onValueChange: PropTypes.func,
  persistedTheaterID: PropTypes.string,
  theatres: PropTypes.array,
};
