import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import MovieListItem from './MovieListItem';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

class MovieList extends Component {
  getMovie = id => this.props.movies.find(x => x.ID === id);

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.schedule !== undefined ?
          this.props.schedule.map((show, i) =>
            <View key={i}>
              <MovieListItem movie={this.getMovie(show.EventID)} show={show} />
            </View>) : <View />}
      </ScrollView>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.array,
  schedule: PropTypes.array,
};

export default MovieList;
