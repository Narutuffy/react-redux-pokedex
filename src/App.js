import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import Navbar from './components/Navbar';
import PokeTable from './components/PokeTable';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const App = () => (
  <Provider store={createStoreWithMiddleware(reducers)} >
    <div>
      <Navbar />
      <PokeTable />
    </div>
  </Provider>
);

export default App;
