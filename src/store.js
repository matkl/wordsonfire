import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    console.log(store.getState()); // eslint-disable-line no-console
  });
}

export default store;
