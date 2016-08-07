export default function vibrate(...args) {
  if (!window.navigator.vibrate) return false;
  return window.navigator.vibrate(...args);
}
