import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import AreaPicker from '../components/AreaPicker';
import DatePicker from '../components/DatePicker';
import MovieList from '../components/MovieList';

import eventConverter from '../converters/event';
import scheduleConverter from '../converters/schedule';
import theatreAreaConverter from '../converters/theatreArea';

const styles = StyleSheet.create({
  areaTitle: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    height: 200,
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
    areas: [],
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
    schedule: [],
    selectedAreaID: '1029',
    selectedAreaName: 'Valitse alue/teatteri',
    showAreaPicker: false,
  };

  componentDidMount() {
    this.fetchAreas();
    this.fetchMovies();
  }

  fetchAreas = () => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        this.setState({
          areas: theatreAreaConverter(request.responseText),
        });
      }
    };
    request.open('GET', 'http://www.finnkino.fi/xml/TheatreAreas/');
    request.send();
  }

  fetchMovies = (areaID) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        this.setState({
          movies: eventConverter(request.responseText),
        });
      }
    };
    const url = `http://www.finnkino.fi/xml/Events/?area=${areaID}`;
    request.open('GET', url);
    request.send();
  }

  fetchSchedule = (areaID, movieID) => {
    const request = new XMLHttpRequest();
    request.TheatreID = areaID;
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        this.setState({
          schedule: scheduleConverter(request.responseText),
        });
      }
    };
    const url = `http://www.finnkino.fi/xml/Schedule/?area=${areaID}&${movieID}`;
    request.open('GET', url);
    request.send();
  }

  handleAreaChange = (id) => {
    this.setState({
      selectedAreaID: id,
      selectedAreaName: this.state.areas.find(x => x.ID === id).Name,
      showAreaPicker: false,
    });
    this.fetchMovies(this.state.selectedAreaID);
  }

  toggleAreaPicker = () => {
    this.setState({
      showAreaPicker: !this.state.showCancel,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cinemabot</Text>
        <TouchableHighlight onPress={this.toggleAreaPicker}>
          <Text style={styles.areaTitle}>{this.state.selectedAreaName}</Text>
        </TouchableHighlight>
        {this.state.showAreaPicker ?
          <AreaPicker
            areas={this.state.areas}
            onValueChange={this.handleAreaChange}
            selectedAreaID={this.state.selectedAreaID}
          /> : <View />}
        <DatePicker />
        <MovieList movies={this.state.movies} />
      </View>
    );
  }
}

export default Home;
