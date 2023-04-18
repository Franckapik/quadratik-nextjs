import { useEffect, useState } from "react";
import { useProductStore } from "./store";

export const usePerformances = (n, p, w, e, P, N) => {
  const [performances, setPerformances] = useState(false);
  useProductStore.setState({ fmin: "fmin" });
  

  useEffect(() => {
    const a = Array(n)
    .fill("")
    .map((a, i) => {
      const n = i % p;
      const m = Math.floor(i / p);
      const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p;
      return an;
    });

  const amax = Math.max(...a);

  const fmin = Math.round((((344 / 2 / P / 10) * amax) / N) * 1000);
  const fmax = Math.round(344 / 2 / (cwidth / 100));
  const cwidth = (w - (p + 1) * e) / p;
  console.log(cwidth);

    setPerformances(amax);
  }, [n, p, w, e, P, N]);

  return performances;
};
