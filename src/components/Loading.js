import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#334d5d',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    height: 240,
    width: 240,
    marginBottom: 50,
  },
});

const logo = require('../images/logo.png');

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
