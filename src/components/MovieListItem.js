import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  movieListItem: {
    backgroundColor: 'white',
    color: 'blue',
    fontSize: 20,
    margin: 10,
  },
});

export default class MovieListItem extends Component {
  render() {
    const goToMovie = () => Actions.movie({ movie: this.props.movie });
    return (
      <View>
        <Text
          style={styles.movieListItem}
          onPress={goToMovie}
        >{this.props.movie.Title}</Text>
      </View>
    );
  }
}

MovieListItem.propTypes = {
  movie: PropTypes.object.isRequired,
};
