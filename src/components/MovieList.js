import React, { Component, PropTypes } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import MovieListItem from './MovieListItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
  },
});

export default class MovieList extends Component {
  getEvent = (id) => {
    return this.props.events.find(x => x.ID === id);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.schedule.map((show, i) =>
          <View key={i}>
            <MovieListItem movie={this.getEvent(show.EventID)} />
          </View>)}
      </ScrollView>
    );
  }
}

MovieList.propTypes = {
  events: PropTypes.array,
  schedule: PropTypes.array,
};
