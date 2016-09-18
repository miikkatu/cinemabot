import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import AreaPicker from '../components/AreaPicker';
import DatePicker from '../components/DatePicker';
import MovieList from '../components/MovieList';

const movies = [
  {
    title: 'Alien',
  },
  {
    title: 'Blade Runner',
  },
  {
    title: 'Escape from New York',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 10,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AreaPicker persistedArea="Tampere" />
        <DatePicker />
        <MovieList movies={movies} />
      </View>
    );
  }
}
