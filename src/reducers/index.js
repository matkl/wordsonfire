import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';
import tiles from './tiles';

export default combineReducers({
  tiles,
  path(state = [], action) {
    switch (action.type) {
      case ActionTypes.APPEND_NODE:
        return [...state, action.node];
      case ActionTypes.REMOVE_LAST_NODE:
        return state.slice(0, -1);
      case ActionTypes.SUBMIT_PATH:
        return [];
      default:
        return state;
    }
  },
});

