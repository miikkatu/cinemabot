import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Home from '../components/Home';
import Movie from '../components/Movie';
import MovieList from '../components/MovieList';

const getSceneStyle = () => {
  const style = {
    flex: 1,
    backgroundColor: '#000',
  };
  return style;
};

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: '#000',
    borderBottomWidth: 0,
  },
  titleStyle: {
    backgroundColor: '#000',
  },
});

export default class App extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene
            key="home"
            component={Home}
            duration={1}
            hideNavBar
            navigationBarStyle={styles.navigationBarStyle}
            titleStyle={styles.titleStyle}
            initial
          />
          <Scene
            key="movielist"
            component={MovieList}
            duration={1}
            hideNavBar
            navigationBarStyle={styles.navigationBarStyle}
            backTitle="Takaisin"
            titleStyle={styles.titleStyle}
          />
          <Scene
            key="movie"
            component={Movie}
            duration={1}
            hideNavBar
            navigationBarStyle={styles.navigationBarStyle}
            backTitle="Takaisin"
            backStyle={styles.titleStyle}
          />
        </Scene>
      </Router>
    );
  }
}
