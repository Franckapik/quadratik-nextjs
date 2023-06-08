import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useBearStore } from "./store";

export const useScroll = (ref) => {
  const [scroll, setScroll] = useState(false);
  const [height, setHeight] = useState(false);
  const [width, setWidth] = useState(false);

  useEffect(() => {
    if (ref.current != null) {
      const getScroll = (e) => {
        setScroll(e.target.scrollTop);
        useBearStore.setState({ scroll: e.target.scrollTop });
      };
      const container = ref.current.container.current;
      container.addEventListener("scroll", getScroll);

      return () => {
        container.removeEventListener("scroll", getScroll);
      };
    }
  }, [ref]);

  useEffect(() => {
    setHeight(ref.current.space);
    setWidth(ref.current.container.current.offsetWidth);
    useBearStore.setState({ width: ref.current.container.current.offsetWidth });
    useBearStore.setState({ height: ref.current.space });
  }, [ref]);

  return [scroll, height, width];
};
