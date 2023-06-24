
export const useNomenclature = (defaultProduct, labels, dimensions) => {
  const nomDiffuseur = (basename, dimensions) => {
    const { C, D, E, I, L, M, N, P, W, H, V, T } = dimensions;
    return {
      structurel: D + "N" + N + "W" + W + "P" + P + "L" + L + "E" + E + M,
      complet: D + "N" + N + "W" + W + "P" + P + "L" + L + "E" + E + M + "C" + C + "I" + I + "H" + H + "V" + V + (C != 0 ? "T" + T : ""),
      simple: basename + "-" + N + P + (L == "2" ? "L" : "") + (C != 0 && T !== undefined && T != 0 ? T : ""),
      performance: "N" + N + "W" + W + "P" + P,
    };
  };
  const nomAbsorbeur = (basename, dimensions, labels) => {
    const { E, L, M, P, W, A } = dimensions;
    const { F } = labels;
    return {
      structurel: "A" + "W" + W + "L" + L + "P" + P + "E" + E + M,
      complet: "A" + "W" + W + "L" + L + "P" + P + "E" + E + M,
      simple: basename + F + "-" + P + (L == "2" ? "L" : ""),
      performance: "A" + "P" + P + A ,
    };
  };
  const nomTuile = (basename, dimensions, labels) => {
    const { E, L, M, P, W, A, O } = dimensions;
    const { F } = labels;
    return {
      structurel: "A" + "W" + W + "L" + L + "P" + P + "E" + E ,
      complet: "A" + "W" + W + "L" + L + "P" + P + "E" + E,
      simple: basename + "-" + P + O + (L == "2" ? "L" : ""),
      performance: "A" + "P" + P + A ,
    };
  };

  console.log(dimensions);

  if (dimensions && defaultProduct?.label) {
    let basename;
    let nomenclature;
    switch (true) {
      case defaultProduct.label.includes("Diffuseur") && dimensions.D === "D1":
        basename = "Indik";
        break;
      case defaultProduct.label.includes("Diffuseur") && dimensions.D === "D2":
        basename = "Woodik";
        break;
      case defaultProduct.label.includes("Absorbeur") && dimensions.F !== undefined:
        basename = "Quadra";
        break;
      case defaultProduct.label.includes("Absorbeur") && dimensions.O !== undefined:
        basename = "Tilik";
        break;

      default:
        console.log("Produit par defaut non identifié - Nomenclature inconnue");
        break;
    }

    switch (basename) {
      case "Indik":
        nomenclature = nomDiffuseur(basename, dimensions);
        break;
      case "Woodik":
        nomenclature = nomDiffuseur(basename, dimensions);
        break;
      case "Quadra":
        nomenclature = nomAbsorbeur(basename, dimensions, labels);
        break;
      case "Tilik":
        nomenclature = nomTuile(basename, dimensions, labels);
        break;

      default:
        break;
    }

    return nomenclature;
  }
};
