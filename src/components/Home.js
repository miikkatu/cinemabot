import React, { Component } from 'react';
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View } from 'react-native';
import moment from 'moment';

import AreaPicker from '../components/AreaPicker';
import DatePicker from '../components/DatePicker';
import Loading from '../components/Loading';
import MovieList from '../components/MovieList';

import eventConverter from '../converters/event';
import scheduleConverter from '../converters/schedule';
import theatreAreaConverter from '../converters/theatreArea';

require('moment/locale/fi');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 200,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 30,
  },
  picker: {
    height: 40,
  },
  pickerTitle: {
    color: 'white',
    fontSize: 24,
  },
});

const defaultAreaID = '1029';

class Home extends Component {
  state = {
    areaDates: [],
    areas: [],
    loadingAreas: true,
    loadingMovies: true,
    movies: [],
    schedule: [],
    selectedAreaID: defaultAreaID,
    selectedAreaName: 'Valitse alue/teatteri',
    selectedDate: new Date(),
    showAreaPicker: false,
    showDatePicker: false,
  };

  componentDidMount() {
    try {
      AsyncStorage.getItem('savedAreaID').then((value) => {
        if (value !== null) {
          this.setState({
            selectedAreaID: value,
            isLoading: false,
          });
        }
      }).done();
    } catch (e) {
      AsyncStorage.setItem('savedAreaID', defaultAreaID);
    }
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
        const areas = theatreAreaConverter(request.responseText);
        this.setState({
          areas,
          loadingAreas: false,
          selectedAreaName: areas.find(x => x.ID === this.state.selectedAreaID).Name,
        });
        if (this.state.selectedAreaID !== defaultAreaID) {
          this.fetchSchedule(this.state.selectedAreaID, this.state.selectedDate);
        }
      }
    };
    request.open('GET', 'http://www.finnkino.fi/xml/TheatreAreas/');
    request.send();
  }

  fetchMovies = () => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        this.setState({
          loadingMovies: false,
          movies: eventConverter(request.responseText),
        });
      }
    };
    const url = 'http://www.finnkino.fi/xml/Events?includeLinks=true&includeGallery=true&includePictures=true';
    request.open('GET', url);
    request.send();
  }

  isUpcoming = value => moment(value.dttmShowStart).isAfter(this.state.selectedDate);

  fetchSchedule = (areaID, date) => {
    if (areaID === defaultAreaID) {
      this.setState({
        schedule: [],
      });
    } else {
      const request = new XMLHttpRequest();
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const requestResult = scheduleConverter(request.responseText);
          if (requestResult !== undefined && requestResult.length > 0) {
            this.setState({
              schedule: requestResult.filter(this.isUpcoming),
            });
          } else {
            this.setState({
              schedule: [],
            });
          }
        }
      };
      const url = `http://www.finnkino.fi/xml/Schedule?area=${areaID}&dt=${moment(date).format('DD.MM.YYYY')}`;
      request.open('GET', url);
      request.send();
    }
  }

  handleAreaChange = (id) => {
    AsyncStorage.setItem('savedAreaID', id);
    this.setState({
      selectedAreaID: id,
      selectedAreaName: this.state.areas.find(x => x.ID === id).Name,
    });
    this.fetchSchedule(id, this.state.selectedDate);
  }

  handleDateChange = (selectedDate) => {
    this.setState({
      selectedDate,
    });
    this.fetchSchedule(this.state.selectedAreaID, selectedDate);
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
    if (this.state.loadingAreas || this.state.loadingMovies) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <TouchableHighlight onPress={this.toggleAreaPicker} style={styles.picker}>
          <Text style={styles.pickerTitle}>{this.state.selectedAreaName}</Text>
        </TouchableHighlight>
        {this.state.showAreaPicker ?
          <AreaPicker
            areas={this.state.areas}
            onValueChange={this.handleAreaChange}
            selectedAreaID={this.state.selectedAreaID}
          /> : <View />}
        <TouchableHighlight onPress={this.toggleDatePicker} style={styles.picker}>
          <Text style={styles.pickerTitle}>{moment(this.state.selectedDate).format('D.M.YYYY')}</Text>
        </TouchableHighlight>
        {this.state.showDatePicker ?
          <DatePicker
            areaDates={this.state.areaDates}
            onDateChange={this.handleDateChange}
            selectedDate={this.state.selectedDate}
          /> : <View />}
        <MovieList movies={this.state.movies} schedule={this.state.schedule} />
      </View>
    );
  }
}

export default Home;
