import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

require('moment/locale/fi');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    borderColor: 'darkgrey',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  time: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    color: '#ffc40c',
    fontSize: 20,
  },
});

export default class MovieListItem extends Component {
  render() {
    const goToMovie = () => Actions.movie({
      movie: this.props.movie,
      show: this.props.show,
    });
    return (
      <View style={styles.container}>
        <Text style={styles.title} onPress={goToMovie}>
          {this.props.movie.Title}
        </Text>
        <Text style={styles.time}>
          {moment(this.props.show.dttmShowStart).format('HH:mm')} {this.props.show.Theatre} {this.props.show.TheatreAuditorium}
        </Text>
      </View>
    );
  }
}

MovieListItem.propTypes = {
  movie: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
};
