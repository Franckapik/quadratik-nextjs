import { useEffect, useState } from "react";
import { useProductStore } from "./store";

export const usePerformances = (amax, cwidth, P, N) => {
  const [performances, setPerformances] = useState(false);
  console.log("hook", amax, cwidth, P, N);


  useEffect(() => {
    const fmin = Math.round((((344 / 2 / P / 10) * amax) / N) * 1000);
    const fmax = Math.round(344 / 2 / (cwidth / 100));

    setPerformances([fmin, fmax]);
    useProductStore.setState({ fmin: fmin, fmax: fmax, cwidth: cwidth });
  }, [amax, cwidth, P, N]);

  return performances;
};
