import React, { Component, PropTypes } from 'react';
import Tile from './Tile';
import Path from './Path';
import { insideCross } from '../math';
import { boardSize } from '../constants';
import './Board.styl';

const propTypes = {
  actions: PropTypes.object.isRequired,
  tiles: PropTypes.array.isRequired,
  squareSize: PropTypes.number.isRequired,
  path: PropTypes.array.isRequired,
};

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }
  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
  handleMouseDown(event) {
    const { offsetX, offsetY } = event.nativeEvent;
    this.startDraw(offsetX, offsetY);
    window.addEventListener('mouseup', this.handleMouseUp);
  }
  handleMouseMove(event) {
    const { offsetX, offsetY } = event.nativeEvent;
    this.draw(offsetX, offsetY);
  }
  handleMouseUp() {
    this.stopDraw();
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
  handleTouchStart(event) {
    event.preventDefault();
    const { touches } = event.nativeEvent;
    const { left, top } = this.ref.getBoundingClientRect();
    this.startDraw(touches[0].clientX - left, touches[0].clientY - top);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
  }
  handleTouchMove(event) {
    event.preventDefault();
    const { changedTouches } = event;
    const { left, top } = this.ref.getBoundingClientRect();
    this.draw(changedTouches[0].clientX - left, changedTouches[0].clientY - top);
  }
  handleTouchEnd(event) {
    event.preventDefault();
    this.stopDraw();
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('touchmove', this.handleTouchMove);
  }
  startDraw(offsetX, offsetY) {
    const { squareSize } = this.props;
    const x = Math.floor(offsetX / squareSize);
    const y = Math.floor(offsetY / squareSize);
    const node = (y * boardSize) + x;
    this.props.actions.applyNode(node);
    this.drawing = true;
  }
  draw(offsetX, offsetY) {
    if (!this.drawing) return;
    const { squareSize } = this.props;
    const x = offsetX / squareSize;
    const y = offsetY / squareSize;

    if (insideCross(0.15, x % 1, y % 1)) {
      const node = (Math.floor(y) * boardSize) + Math.floor(x);
      this.props.actions.applyNode(node);
    }
  }
  stopDraw() {
    this.drawing = false;
    this.props.actions.submitPath();
  }
  render() {
    const { tiles, path, squareSize } = this.props;
    const style = {
      fontSize: squareSize,
      height: `${boardSize}em`,
      width: `${boardSize}em`,
    };

    return (
      <div
        className="Board"
        ref={ref => { this.ref = ref; }}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onTouchStart={this.handleTouchStart}
        style={style}
      >
        {tiles.map(tile => (
          <Tile
            {...tile}
            active={path.indexOf(tile.node) >= 0}
            key={tile.id}
          />
        ))}
        <Path path={path} squareSize={squareSize} />
      </div>
    );
  }
}

Board.propTypes = propTypes;
