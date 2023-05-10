import { useEffect, useState } from "react";

export const useValues3D = (valuesSelected, attributes, isQuadralab) => {
  const [values3D, setValues3D] = useState(false);
  useEffect(() => {
    const listOfValues = Object.entries(attributes).reduce((acc, [i, a] = cur) => {
      for (let key in a.values) {
        acc.push(a.values[key]);
      }
      return acc;
    }, []);

    const listOfv3d = Object.entries(valuesSelected).reduce((acc, [i, a] = cur) => {
      const isNotIdValue = [];
      if (isQuadralab) { //range instead of select
        isNotIdValue.push("W")
        isNotIdValue.push("P")
      }
      if (!isNotIdValue.includes(i)) {
        const pickValue = listOfValues.filter((value) => value.v_id === a)[0];
        if (pickValue !== undefined) {
          if (i !== "F") { //add label for quadrablack name
            return {
            ...acc,
            [i]: pickValue.v_3d,
          };
          } else {
            return {
              ...acc,
              [i]: pickValue.v_3d,
              ["QUADRANAME"]: pickValue.v_label,
            };
          }
          
        } else {
          return acc;
        }
      } else { 
        return {
          ...acc,
          [i]: a,
        };
      }
    }, 0);

    setValues3D(listOfv3d);
  }, [valuesSelected]);

  return values3D;
};
