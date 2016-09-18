import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';

import MovieListItem from './MovieListItem';

const styles = StyleSheet.create({
  container: {
  },
});

export default class MovieList extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.movies.map((movie, i) =>
          <View key={i}>
            <MovieListItem movie={movie} />
          </View>)}
      </View>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.array,
};
