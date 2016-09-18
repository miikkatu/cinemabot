import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';

import MovieListItem from './MovieListItem';

const styles = StyleSheet.create({
  movieList: {
    margin: 10,
  },
});

export default class MovieList extends Component {
  render() {
    return (
      <View style={styles.movieList}>
        {this.props.movies.map((movie, i) =>
          <MovieListItem
            key={i}
            title={movie.title}
          />)}
      </View>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.array,
};
