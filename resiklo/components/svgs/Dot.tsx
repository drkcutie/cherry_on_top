import Svg, { Circle } from 'react-native-svg';

export default function Dot() {
  return (
    <Svg width="7" height="7" viewBox="0 0 7 7" fill="none">
      <Circle cx="3.5" cy="3.5" r="3" transform="rotate(-180 3.5 3.5)" fill="#2E2E2E" />
    </Svg>
  );
}
