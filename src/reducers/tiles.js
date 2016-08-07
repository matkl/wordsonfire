/* eslint no-constant-condition: ["error", { "checkLoops": false }] */

import * as ActionTypes from '../actions';
import { boardSize } from '../constants';
import dictionary from '../dictionary';

function* generateId() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const id = generateId();

function createTile(node) {
  return {
    id: id.next().value,
    text: dictionary.generateRandomLetter(),
    node,
    temperature: 0,
  };
}

function getInitialState() {
  const state = [];
  for (let i = 0; i < boardSize * boardSize; i++) {
    state.push(createTile(i));
  }
  return state;
}

export default function tiles(state = getInitialState(), action) {
  switch (action.type) {
    case ActionTypes.SUBMIT_PATH:
      return state.filter(tile => action.path.indexOf(tile.node) === -1);
    case ActionTypes.APPLY_GRAVITY:
      return state.map(tile => {
        let holesCount = 0;
        for (let i = tile.node; i < boardSize * boardSize; i += boardSize) {
          if (!state.find(otherTile => otherTile.node === i)) holesCount += 1;
        }
        return holesCount > 0 ? Object.assign({}, tile, {
          node: tile.node + (holesCount * boardSize),
        }) : tile;
      });
    case ActionTypes.FILL_BOARD: {
      const newTiles = [];
      for (let i = 0; i < boardSize * boardSize; i++) {
        if (!state.find(tile => tile.node === i)) {
          newTiles.push(createTile(i));
        }
      }
      return [...state, ...newTiles];
    }
    default:
      return state;
  }
}
