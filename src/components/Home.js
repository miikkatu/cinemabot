import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AreaPicker from '../components/AreaPicker';
import DatePicker from '../components/DatePicker';
import MovieList from '../components/MovieList';

const movies = [
  {
    title: 'Alien',
    year: '1979',
  },
  {
    title: 'Blade Runner',
    year: '1982',
  },
  {
    title: 'Escape from New York',
    year: '1982',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 20,
  },
  title: {
    color: 'orange',
    fontSize: 20,
  },
});

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cinemabot</Text>
        <AreaPicker persistedArea="Tampere" />
        <DatePicker />
        <MovieList movies={movies} />
      </View>
    );
  }
}
