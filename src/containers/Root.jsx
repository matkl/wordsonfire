import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Game from './Game';

export default function () {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
