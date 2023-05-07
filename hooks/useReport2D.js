import { useEffect, useState } from "react";
import { useProductStore } from "./store";

export const useReport2D = (n,p, hor, vert, c, invert, start, amax, e, d) => {
  const [report2D, setReport2D] = useState(false);
console.log(n,p, hor, vert, c, invert, start, amax, e, d);
  useEffect(() => {
    const report = Array(n) //cellules
      .fill("")
      .map((a, i) => {
        const n = i % p;
        const m = Math.floor(i / p);
        const o = (Math.pow(n + hor, 2) + Math.pow(m + vert, 2)) % p;
        const x = start[0] + c / 2 + n * (c + e);
        const z = start[1] + c / 2 + e + m * (c + e);
        const y = invert ? d - (o * d) / amax : (o * d) / amax;
        return ({"ratio" : Math.round((y / d) * amax), "hauteur" : Math.round(y * 100) / 100});
      });


      const lengthWells = Object.values(report).reduce((acc, val) => acc + val.hauteur, 0 );
      const completeReport = {...report, ["Cells"] : n, ["Type"] : p, ["Thickness"] : e, ["ShiftHor"] : hor, ["ShiftVert"]: vert, ["MaxDepth"] : amax, ["lengthWells"] : lengthWells}
      
      
      useProductStore.setState({ report2D: completeReport });
      setReport2D(completeReport);

  }, [n,p,c, hor, vert, invert, e, d]);

  return report2D;
};
