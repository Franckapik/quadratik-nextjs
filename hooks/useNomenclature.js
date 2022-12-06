import { useEffect, useState } from "react";

export const useNomenclature = (product3D, properties) => {
  const [nomenclature, setNomenclature] = useState(false);

  useEffect(() => { //generate nomenclature
    setNomenclature({
      structurel:
        product3D.D + "N" + product3D.N + "W" + product3D.W + "L" + product3D.L + "P" + product3D.P + "E" + product3D.E + product3D.M,
      complet:
        product3D.D +
        "N" +
        product3D.N +
        "W" +
        product3D.W +
        "L" +
        product3D.L +
        "P" +
        product3D.P +
        "E" +
        product3D.E +
        product3D.M +
        "C" +
        product3D.C +
        "I" +
        product3D.I +
        "H" +
        product3D.H +
        "V" +
        product3D.V,
      simple: properties.ref + "-" + product3D.N + product3D.P + (product3D.L == "2" ? "L" : ""),
    });
  }, [product3D, properties]);

  return nomenclature;

}