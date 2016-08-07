import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { boardSize } from '../constants';
import './Tile.styl';

const propTypes = {
  text: PropTypes.string.isRequired,
  node: PropTypes.number.isRequired,
  active: PropTypes.bool,
};

export default class Tile extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.active !== this.props.active) return true;
    if (nextProps.node !== this.props.node) return true;
    if (nextProps.text !== this.props.text) return true;
    return false;
  }
  render() {
    const { text, node, active } = this.props;
    const x = node % boardSize;
    const y = Math.floor(node / boardSize);
    const style = {
      transform: `translate3d(${x}em,${y}em,0)`,
    };
    const className = classNames({
      Tile: true,
      'Tile--active': active,
    });

    return (
      <div className={className} style={style}>
        <div className="Tile__text">
          {text}
        </div>
      </div>
    );
  }
}

Tile.propTypes = propTypes;
