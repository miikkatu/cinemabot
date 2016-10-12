import React, { Component, PropTypes } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

require('moment/locale/fi');

const styles = StyleSheet.create({
  container: {
    margin: 20,
    paddingTop: 70,
  },
  detail: {
    fontSize: 14,
  },
  detailBold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  originalTitle: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  section: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
  },
});

export default class Movie extends Component {
  getActorList = () => {
    const actors = this.props.movie.Cast.Actor.map((actor) => {
      return ` ${actor.FirstName} ${actor.LastName}`;
    });
    return actors.toString().slice(1);
  }

  getDirectorList = () => {
    if (this.props.movie.Directors.Director.constructor === Array) {
      const directors = this.props.movie.Directors.Director.map((director) => {
        return ` ${director.FirstName} ${director.LastName}`;
      });
      return directors.toString().slice(1);
    } else {
      return ` ${this.props.movie.Directors.Director.FirstName} ${this.props.movie.Directors.Director.LastName}`;
    }
  }

  getDuration = () => {
    const m = moment.duration(parseInt(this.props.movie.LengthInMinutes, 10), 'minutes');
    return `${m.hours()} h ${m.minutes()} min`;
  }

  setUriAsHttps = () => {
    return this.props.movie.Images.EventSmallImagePortrait
      .replace(/^http:\/\//i, 'https://');
  }

  render() {
    const goToHome = () => Actions.pop();
    return (
      <ScrollView style={styles.container}>

        <Image
          style={{width: 99, height: 146}}
          source={{ uri: this.setUriAsHttps() }}
        />

        <View style={styles.section}>
          <Text style={styles.title}>
            {this.props.movie.Title}
          </Text>

          <Text style={styles.originalTitle}>
            {this.props.movie.OriginalTitle} ({this.props.movie.ProductionYear})
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.detailBold}>{moment(this.props.show.dttmShowStart).format('HH:mm')} {this.props.show.Theatre} ({this.props.show.TheatreAuditorium})</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.detail}>
            Lajityyppi: {this.props.movie.Genres}
          </Text>

          <Text style={styles.detail}>
            Levittäjä: {this.props.movie.LocalDistributorName}
          </Text>
        </View>

        <View style={styles.section}>
          {this.props.movie.Directors.Director ?
            <Text style={styles.detail}>
              Ohjaus: <Text>{this.getDirectorList()}</Text>
            </Text> : null}
          {this.props.movie.Cast ?
            <Text style={styles.detail}>
              Pääosissa: {this.getActorList()}
            </Text> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.detail}>
            Ensi-ilta: <Text style={styles.detailBold}>
              {moment(this.props.movie.dtLocalRelease).format('D.M.YYYY')}</Text>
          </Text>

          <Text style={styles.detail}>
            Kesto: <Text style={styles.detailBold}>{this.getDuration()}</Text>
          </Text>

          <Text style={styles.detail}>Ikäraja: <Text style={styles.detailBold}>
            {this.props.movie.RatingLabel}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.detail}>
            {this.props.movie.Synopsis}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
};
