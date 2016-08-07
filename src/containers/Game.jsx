import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Board from '../components/Board';
import * as GameActions from '../actions';

const propTypes = {
  actions: PropTypes.object.isRequired,
  tiles: PropTypes.array.isRequired,
  path: PropTypes.array.isRequired,
};

function Game({ actions, tiles, path }) {
  return (
    <Board tiles={tiles} path={path} squareSize={72} actions={actions} />
  );
}

Game.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    tiles: state.tiles,
    path: state.path,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
