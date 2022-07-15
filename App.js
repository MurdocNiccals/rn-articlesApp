import React from 'react';
import Main from './src/Main';

import { LogBox } from 'react-native';


const App = () => {

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  return (
      <Main />
  );
};

export default App;
