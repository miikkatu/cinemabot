import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
  },
});

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cinemabot</Text>
      </View>
    );
  }
}

export default Loading;
