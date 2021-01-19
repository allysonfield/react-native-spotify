import React from 'react';
import {StatusBar} from 'react-native';

import Navigator from './src/App';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#1DB954" />
    <Navigator />
  </>
);

export default App;
