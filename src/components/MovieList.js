import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import MovieListItem from './MovieListItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
  },
});

export default class MovieList extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.movies.map((movie, i) =>
          <View key={i}>
            <MovieListItem movie={movie} />
          </View>)}
      </ScrollView>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.array,
};
