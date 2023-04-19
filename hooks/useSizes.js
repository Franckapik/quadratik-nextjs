import { useEffect, useState } from "react";
import { useProductStore } from "./store";


export const useSizes = (valuesSelected,  attributes) => {
  const [sizes, setSizes] = useState(false);
  useProductStore.setState({ sizes: sizes });

  useEffect(() => {
    const listOfValues = Object.entries(attributes).reduce((acc, [i, a] = cur) => {
      for (let key in a.values) {
        acc.push(a.values[key]);
      }
      return acc;
    }, []);
    
    const facteurLongueur = listOfValues.filter((value) => value.v_id === valuesSelected.L)[0].v_3d;
    const largeur = listOfValues.filter((value) => value.v_id === valuesSelected.W)[0].v_3d;
    const longueur = facteurLongueur * largeur;
    const epaisseur = listOfValues.filter((value) => value.v_id === valuesSelected.E)[0].v_3d;
    
    setSizes({longueur : longueur,largeur : largeur,  epaisseur : epaisseur});
  }, [valuesSelected]);

  return [sizes, setSizes];
};
