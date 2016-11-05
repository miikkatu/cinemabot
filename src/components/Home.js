import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import AreaPicker from '../components/AreaPicker';
import DatePicker from '../components/DatePicker';
import Loading from '../components/Loading';

import eventConverter from '../converters/event';
import scheduleConverter from '../converters/schedule';
import theatreAreaConverter from '../converters/theatreArea';

require('moment/locale/fi');

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 40,
    marginTop: 30,
  },
  container: {
    backgroundColor: '#000',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  logo: {
    height: 120,
    width: 120,
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  picker: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
  },
  pickerTitle: {
    color: '#e6e6e6',
    fontSize: 28,
  },
});

const defaultAreaID = '1029';
const logo = require('../images/f_logo.png');

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
    showShowScheduleButton: false,
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
        showShowScheduleButton: false,
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
            const filteredResults = requestResult.filter(this.isUpcoming);
            if (filteredResults.length > 0) {
              this.setState({
                schedule: filteredResults,
                showShowScheduleButton: true,
              });
            }
          } else {
            this.setState({
              schedule: [],
              showShowScheduleButton: false,
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
    if (!this.state.showAreaPicker) {
      this.setState({
        showAreaPicker: true,
        showDatePicker: false,
      });
    } else {
      this.setState({
        showAreaPicker: false,
      });
    }
  }

  toggleDatePicker = () => {
    if (!this.state.showDatePicker) {
      this.setState({
        showDatePicker: true,
        showAreaPicker: false,
      });
    } else {
      this.setState({
        showDatePicker: false,
      });
    }
  }

  showShowScheduleButtonStyle = () => {
    if (this.state.showShowScheduleButton) {
      return {
        color: '#ffc40c',
        fontSize: 28,
      };
    }
    return {
      color: 'black',
      fontSize: 28,
    };
  }

  render() {
    const goToMovieList = () => {
      this.setState({
        showAreaPicker: false,
        showDatePicker: false,
      });
      Actions.movielist({
        movies: this.state.movies,
        schedule: this.state.schedule,
      });
    };

    if (this.state.loadingAreas || this.state.loadingMovies) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View>
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
            <Text style={styles.pickerTitle}>{moment(this.state.selectedDate).format('D.M.YYYY HH:mm')}</Text>
          </TouchableHighlight>
          {this.state.showDatePicker ?
            <DatePicker
              areaDates={this.state.areaDates}
              onDateChange={this.handleDateChange}
              selectedDate={this.state.selectedDate}
            /> : <View />}
          <TouchableHighlight style={styles.button} onPress={goToMovieList}>
            <Text style={this.showShowScheduleButtonStyle()}>Näytä elokuvat</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Home;
