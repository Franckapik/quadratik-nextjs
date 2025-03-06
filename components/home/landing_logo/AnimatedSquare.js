import { animated } from "@react-spring/web";
import { useAnimatedPath } from "../../../hooks/useAnimatedPath";

export const AnimatedSquare = ({ toggle }) => {
  const animatedProps = useAnimatedPath({ toggle, delay: 0, duration: 3000 });

  return <animated.rect x="0" y="0" fill="none" width="100%" height="100%" {...animatedProps} />;
};
