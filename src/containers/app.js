import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Home from '../components/Home';
import Movie from '../components/Movie';

const getSceneStyle = () => {
  const style = {
    flex: 1,
    backgroundColor: '#000',
  };
  return style;
};

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: 'black',
  },
  titleStyle: {
    color: 'white',
  },
});

export default class App extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene key="home" component={Home} title="Cinemabot" hideNavBar initial />
          <Scene
            key="movie"
            component={Movie}
            title="Cinemabot"
            hideNavBar={false}
            navigationBarStyle={styles.navigationBarStyle}
            titleStyle={styles.titleStyle}
          />
        </Scene>
      </Router>
    );
  }
}
