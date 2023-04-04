import { animated } from "@react-spring/web";
import { useAnimatedPath } from "../../hooks/useAnimatedPath";

export const AnimatedLogo = ({ toggle }) => {
  const animatedProps = useAnimatedPath({ toggle, delay: 0, duration: 1000 });

  return (
    <>
      <animated.rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" ry="0" x="65.876" y="65.858" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="107.02" y="65.858" ry="0" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="107.024" y="107.064" ry="0" {...animatedProps} />
      <animated.rect width="27.1" height="27.078" x="65.88" y="107.064" ry="0" {...animatedProps} />
    </>
  );
};
