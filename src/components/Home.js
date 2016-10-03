import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import moment from 'moment';

import AreaPicker from '../components/AreaPicker';
import DatePicker from '../components/DatePicker';
import MovieList from '../components/MovieList';

import eventConverter from '../converters/event';
import scheduleConverter from '../converters/schedule';
import theatreAreaConverter from '../converters/theatreArea';

require('moment/locale/fi');

const styles = StyleSheet.create({
  pickerTitle: {
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
    areaDates: [],
    areas: [],
    movies: [],
    schedule: [],
    selectedAreaID: '1029',
    selectedAreaName: 'Valitse alue/teatteri',
    selectedDate: new Date(),
    showAreaPicker: false,
    showDatePicker: false,
  };

  componentDidMount() {
    this.fetchAreas();
    this.fetchMovies(this.state.selectedAreaID);
    this.fetchSchedule(this.state.selectedAreaID, this.state.selectedDate);
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
    const url = `http://www.finnkino.fi/xml/Events?area=${parseInt(areaID, 10)}`;
    request.open('GET', url);
    request.send();
  }

  fetchSchedule = (areaID, date) => {
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
    const url = `http://www.finnkino.fi/xml/Schedule?area=${parseInt(areaID, 10)}&${moment(date).format('DD.MM.YYYY')}`;
    request.open('GET', url);
    request.send();
  }

  handleAreaChange = (id) => {
    this.setState({
      selectedAreaID: id,
      selectedAreaName: this.state.areas.find(x => x.ID === id).Name,
    });
    this.fetchMovies(this.state.selectedAreaID);
    this.fetchSchedule(this.state.selectedAreaID, this.state.selectedDate);
  }

  handleDateChange = (selectedDate) => {
    this.setState({
      selectedDate,
    });
    this.fetchSchedule(this.state.selectedAreaID, this.state.selectedDate);
  }

  handlePickArea = () => {
    this.setState({
      showAreaPicker: false,
    });
  }

  handlePickDate = () => {
    this.setState({
      showDatePicker: false,
    });
  }

  toggleAreaPicker = () => {
    this.setState({
      showAreaPicker: !this.state.showAreaPicker,
    });
  }

  toggleDatePicker = () => {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cinemabot</Text>
        <TouchableHighlight onPress={this.toggleAreaPicker}>
          <Text style={styles.pickerTitle}>Alue: {this.state.selectedAreaName}</Text>
        </TouchableHighlight>
        {this.state.showAreaPicker ?
          <AreaPicker
            areas={this.state.areas}
            onPickArea={this.handlePickArea}
            onValueChange={this.handleAreaChange}
            selectedAreaID={this.state.selectedAreaID}
          /> : <View />}
        <TouchableHighlight onPress={this.toggleDatePicker}>
          <Text style={styles.pickerTitle}>Päivä: {moment(this.state.selectedDate).format('D.M.YYYY')}</Text>
        </TouchableHighlight>
        {this.state.showDatePicker ?
          <DatePicker
            areaDates={this.state.areaDates}
            onValueChange={this.handleDateChange}
            onPickDate={this.handlePickDate}
            selectedDate={this.state.selectedDate}
          /> : <View />}
        <MovieList movies={this.state.schedule} />
      </View>
    );
  }
}

export default Home;
