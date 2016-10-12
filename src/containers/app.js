import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Home from '../components/Home';
import Movie from '../components/Movie';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Home} title="Cinemabot" initial />
          <Scene key="movie" component={Movie} title="Cinemabot" />
        </Scene>
      </Router>
    );
  }
}
