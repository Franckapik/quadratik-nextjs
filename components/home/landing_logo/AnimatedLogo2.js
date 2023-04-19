import { animated } from "@react-spring/web";
import { useAnimatedPath } from "../../../hooks/useAnimatedPath";

export const AnimatedLogo2 = ({ toggle, setLoading }) => {
  const animatedProps = useAnimatedPath({
    toggle,
    delay: 800,
    duration: 1000,
    onRest: () => setLoading(true),
  });

  return (
    <>
      <animated.rect
        width="27.1"
        height="27.078"
        x="-34.124"
        y="107.28"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps} />
      <animated.rect
        width="27.1"
        height="27.078"
        x="7.021"
        y="107.28"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps} />
      <animated.rect
        width="27.1"
        height="27.078"
        x="7.024"
        y="148.485"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps} />
      <animated.rect
        width="27.1"
        height="27.078"
        x="-34.12"
        y="148.485"
        ry="0"
        transform="rotate(-45)"
        {...animatedProps} />{" "}
    </>
  );
};
