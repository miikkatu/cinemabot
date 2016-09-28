import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  link: {
    color: 'blue',
  },
  title: {
    fontSize: 20,
  },
  year: {
    fontSize: 10,
  },
});

export default class Movie extends Component {
  render() {
    const goToHome = () => Actions.pop();
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.movie.Title}</Text>
        <Text style={styles.year}>{this.props.movie.ProductionYear}</Text>
        <Text style={styles.link} onPress={goToHome}>Go back</Text>
      </View>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};
