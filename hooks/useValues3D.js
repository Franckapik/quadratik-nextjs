import { useEffect, useState } from "react";

export const useValues3D = (valuesSelected, attributes) => {
  const [values3D, setValues3D] = useState(false);

  useEffect(() => {
    const listOfValues = Object.entries(attributes).reduce((acc, [i, a] = cur) => {
      for (let key in a.values) {
        acc.push(a.values[key]);
      }
      return acc;
    }, []);
  
    const listOfv3d = Object.entries(valuesSelected).reduce((acc, [i, a] = cur) => {
      const pickValue = listOfValues.filter((value) => value.v_id === a)[0];
      if (pickValue !== undefined) {
        return {
          ...acc,
          [i]: pickValue.v_3d,
        };
      } else {
        return acc;
      }
    }, 0);
   
    setValues3D(listOfv3d);
  }, [valuesSelected]);

  return values3D;
};
