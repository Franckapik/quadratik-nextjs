import { useState } from "react";
import { useSpring, config, easings } from "@react-spring/web";

export const useAnimatedPath = ({ toggle, delay, onRest, duration }) => {
  const [length, setLength] = useState(null);
  const animatedStyle = useSpring({
    strokeDashoffset: toggle ? 0 : length,
    strokeDasharray: length,
    delay,
    onRest: onRest,
    config: {
      easing: easings.easeInOutCubic,
      duration: duration,
      ...config.slow,
    },
  });

  return {
    style: animatedStyle,
    ref: (ref) => {
      if (ref) {
        setLength(ref.getTotalLength());
      }
    },
  };
};
