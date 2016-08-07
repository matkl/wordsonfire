/**
 * Check if point x,y is inside a cross which is centered in a square of width 1.
 */
export function insideCross(width, x, y) {
  return Math.abs(x - 0.5) < width || Math.abs(y - 0.5) < width;
}
