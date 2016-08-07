import React, { PropTypes } from 'react';
import { boardSize } from '../constants';
import './Path.styl';

const propTypes = {
  path: PropTypes.array.isRequired,
  squareSize: PropTypes.number.isRequired,
};

export default function Path({ path, squareSize }) {
  const strokeWidth = 8;
  const offset = squareSize / 2;
  const points = path.map(node => {
    const x = node % boardSize;
    const y = Math.floor(node / boardSize);
    return [(x * squareSize) + offset, (y * squareSize) + offset].join(',');
  }).join(' ');

  return (
    <svg className="Path" width={squareSize * boardSize} height={squareSize * boardSize}>
      <polyline
        points={points}
        stroke="#ffeb3b"
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
}

Path.propTypes = propTypes;
