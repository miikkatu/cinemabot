import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

require('moment/locale/fi');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#334d5d',
    borderColor: '#383838',
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingBottom: 5,
  },
  time: {
    color: '#e6e6e6',
    fontSize: 18,
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    color: '#efc84a',
    fontSize: 22,
    paddingLeft: 5,
    paddingRight: 5,
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
        <TouchableHighlight
          style={styles.button}
          onPress={goToMovie}
          underlayColor="#334d5d"
        >
          <Text style={styles.title}>
            {this.props.movie.Title}
          </Text>
        </TouchableHighlight>
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
