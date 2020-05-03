import React from 'react';
import Employee from './src/employee';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Employee />
    </Provider>
  );
};

export default App;
