import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AreaPicker from '../components/AreaPicker';
import DatePicker from '../components/DatePicker';
import MovieList from '../components/MovieList';

import theatreAreaConverter from '../converters/theatreArea';

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

class Home extends Component {
  state = {
    theatres: [],
    movies: [
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
    ],
    persistedTheaterID: '1021',
  };

  componentDidMount() {
    this.fetchTheatres();
  }

  fetchTheatres = () => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        this.setState({
          theatres: theatreAreaConverter(request.responseText),
        });
      }
    };
    request.open('GET', 'http://www.finnkino.fi/xml/TheatreAreas/');
    request.send();
  }

  handleAreaChange = (id) => {
    this.setState({ persistedTheaterID: id });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cinemabot</Text>
        <AreaPicker
          onValueChange={this.handleAreaChange}
          persistedTheaterID={this.state.persistedTheaterID}
          theatres={this.state.theatres}
        />
        <DatePicker />
        <MovieList movies={this.state.movies} />
      </View>
    );
  }
}

export default Home;
