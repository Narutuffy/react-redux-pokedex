import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import Navbar from './components/Navbar';
import PokeTable from './components/PokeTable/';
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const App = () => (
  <Provider store={createStoreWithMiddleware(reducers)} >
    <ErrorBoundary>
      <Navbar />
      <PokeTable />
    </ErrorBoundary>
  </Provider>
);

export default App;
