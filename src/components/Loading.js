import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    height: 240,
    width: 240,
  },
});

const logo = require('../images/f_logo.png');

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
      </View>
    );
  }
}

export default Loading;
