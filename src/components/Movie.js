import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  movieListItem: {
    fontSize: 20,
    margin: 10,
  },
});

export default class Movie extends Component {
  render() {
    return (
      <View>
        <Text style={styles.movieListItem}>{this.props.title}</Text>
      </View>
    );
  }
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
};
