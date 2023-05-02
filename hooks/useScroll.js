import { useCallback, useEffect } from "react";
import { useState } from "react";
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const getScroll = (e) => {
      setScrollY(e.target.scrollTop);
    };

    window.addEventListener("scroll", getScroll);

    return () => {
      window.removeEventListener("scroll", getScroll);
    };
  });

  return scrollY;
};
