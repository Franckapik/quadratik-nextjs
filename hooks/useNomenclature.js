import { useEffect, useState } from "react";

export const useNomenclature = (p3d, productParent) => {
  const [nomenclature, setNomenclature] = useState(false);
  useEffect(() => { //generate nomenclature

    setNomenclature({
      structurel:
        p3d.D + "N" + p3d.N + "W" + p3d.W + "L" + p3d.L + "P" + p3d.P + "E" + p3d.E + p3d.M,
      complet:
        p3d.D +
        "N" +
        p3d.N +
        "W" +
        p3d.W +
        "L" +
        p3d.L +
        "P" +
        p3d.P +
        "E" +
        p3d.E +
        p3d.M +
        "C" +
        p3d.C +
        "I" +
        p3d.I +
        "H" +
        p3d.H +
        "V" +
        p3d.V,
      simple: productParent.ref + "-" + p3d.N + p3d.P + (p3d.L == "2" ? "L" : ""),
    });
  }, [p3d, productParent]);

  return nomenclature;

}