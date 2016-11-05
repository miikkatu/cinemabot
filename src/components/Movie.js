import React, { Component, PropTypes } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native';
import FitImage from 'react-native-fit-image';
import moment from 'moment';

require('moment/locale/fi');

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 65,
  },
  contentDescriptor: {
    height: 50,
    width: 50,
  },
  contentDescriptors: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  detail: {
    color: '#e6e6e6',
    fontSize: 18,
  },
  detailBold: {
    color: '#e6e6e6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  originalTitle: {
    color: '#e6e6e6',
    fontSize: 18,
    fontStyle: 'italic',
  },
  section: {
    paddingBottom: 10,
  },
  sectionTitle: {
    flex: 1,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  thumbnailView: {
    paddingBottom: 10,
  },
  link: {
    color: '#ffc40c',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 5,
  },
  title: {
    color: '#e6e6e6',
    fontSize: 22,
  },
  titleImage: {
    height: 146,
    width: 99,
    padding: 10,
  },
  titleView: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 10,
  },
});

export default class Movie extends Component {
  getActorList = () => {
    const actors = this.props.movie.Cast.Actor
      .map(actor => ` ${actor.FirstName} ${actor.LastName}`);
    return actors.toString().slice(1);
  }

  getDirectorList = () => {
    if (this.props.movie.Directors.Director.constructor === Array) {
      const directors = this.props.movie.Directors.Director
        .map(director => ` ${director.FirstName} ${director.LastName}`);
      return directors.toString().slice(1);
    }
    return ` ${this.props.movie.Directors.Director.FirstName} ${this.props.movie.Directors.Director.LastName}`;
  }

  getDuration = () => {
    const m = moment.duration(parseInt(this.props.movie.LengthInMinutes, 10), 'minutes');
    return `${m.hours()} h ${m.minutes()} min`;
  }

  setUriAsHttps = () =>
    this.props.movie.Images.EventSmallImagePortrait.replace(/^http:\/\//i, 'https://');

  openEventURL = () => {
    Linking.canOpenURL(this.props.show.EventURL).then((supported) => {
      if (supported) {
        Linking.openURL(this.props.show.EventURL);
      }
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleView}>

          <Image
            style={styles.titleImage}
            source={{ uri: this.setUriAsHttps() }}
          />

          <View style={styles.sectionTitle}>
            <Text style={styles.title}>
              {this.props.movie.Title}
            </Text>
            <Text style={styles.originalTitle}>
              {this.props.movie.OriginalTitle}
            </Text>
            <Text style={styles.originalTitle}>
              {this.props.movie.ProductionYear}
            </Text>
          </View>

        </View>

        <View style={styles.section}>
          <Text style={styles.detailBold}>{moment(this.props.show.dttmShowStart).format('HH:mm')} {this.props.show.Theatre} ({this.props.show.TheatreAuditorium})</Text>
        </View>

        <TouchableOpacity onPress={this.openEventURL}>
          <Text style={styles.link}>Osta tai varaa liput</Text>
        </TouchableOpacity>

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

        {this.props.movie.ContentDescriptors.ContentDescriptor ?
          <View style={styles.contentDescriptors}>
            {this.props.movie.ContentDescriptors.ContentDescriptor.map((descriptor, i) =>
              <Image
                key={i}
                style={styles.contentDescriptor}
                source={{ uri: descriptor.ImageURL }}
              />
            )}
          </View> : null}

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
            {this.props.movie.ShortSynopsis}
          </Text>
        </View>

        {this.props.movie.Gallery.GalleryImage ?
          this.props.movie.Gallery.GalleryImage.map((image, i) =>
            <View key={i} style={styles.thumbnailView}>
              <FitImage
                style={styles.thumbnail}
                source={{ uri: image.Location }}
              /></View>) : null}

      </ScrollView>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
};
