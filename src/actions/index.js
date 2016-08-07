import { boardSize, minPathLength } from '../constants';
import dictionary from '../dictionary';
import vibrate from '../vibrate';

export const CREATE_TILE = 'CREATE_TILE';
export const REMOVE_LAST_NODE = 'REMOVE_LAST_NODE';
export const APPEND_NODE = 'APPEND_NODE';
export const SUBMIT_PATH = 'SUBMIT_PATH';
export const APPLY_GRAVITY = 'APPLY_GRAVITY';
export const FILL_BOARD = 'FILL_BOARD';

export function createTile() {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_TILE,
    });
  };
}

/**
 * Undo last `appendNode` action.
 */
export function removeLastNode() {
  return dispatch => {
    dispatch({
      type: REMOVE_LAST_NODE,
    });
    vibrate(5);
  };
}

/**
 * Append a node to the current path.
 */
export function appendNode(node) {
  return dispatch => {
    dispatch({
      type: APPEND_NODE,
      node,
    });
    vibrate(5);
  };
}

/**
 * Try to add a node to the current path.
 */
export function applyNode(node) {
  return (dispatch, getState) => {
    const existingPath = getState().path;

    // Going back?
    if (existingPath.length > 1) {
      const prevNode = existingPath[existingPath.length - 2];
      if (node === prevNode) {
        dispatch(removeLastNode());
        return;
      }
    }

    // Ignore nodes that are already part of the path.
    if (existingPath.indexOf(node) >= 0) return;

    const isNodeAdjacent = () => {
      if (existingPath.length === 0) return true;
      const prevNode = existingPath[existingPath.length - 1];
      const dx = (node % boardSize) - (prevNode % boardSize);
      const dy = Math.floor(node / boardSize) - Math.floor(prevNode / boardSize);
      if (dx > 1) return false;
      if (dy > 1) return false;
      if (dx < -1) return false;
      if (dy < -1) return false;
      return true;
    };

    if (!isNodeAdjacent()) return;

    dispatch(appendNode(node));
  };
}

/**
 * Submit all nodes in the current path.
 */
export function submitPath() {
  return (dispatch, getState) => {
    const state = getState();
    const path = state.path;
    if (path.length < minPathLength) {
      dispatch({
        type: SUBMIT_PATH,
        path: [],
      });
      return;
    }

    const word = path.map(node => {
      const tile = state.tiles.find(t => t.node === node);
      if (tile) return tile.text;
      return null;
    }).join('');

    if (!dictionary.contains(word)) {
      dispatch({
        type: SUBMIT_PATH,
        path: [],
      });
      return;
    }

    dispatch({
      type: SUBMIT_PATH,
      path,
    });
    vibrate(20);
    dispatch({
      type: APPLY_GRAVITY,
    });
    dispatch({
      type: FILL_BOARD,
    });
  };
}

export function startGame() {
}
