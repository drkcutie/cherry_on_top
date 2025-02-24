import Svg, { Rect } from 'react-native-svg';

export default function Line() {
  return (
    <Svg width="29" height="7" viewBox="0 0 29 7" fill="none">
      <Rect
        x="28.5"
        y="6.5"
        width="28"
        height="6"
        rx="3"
        transform="rotate(-180 28.5 6.5)"
        fill="#1D6742"
      />
    </Svg>
  );
}
