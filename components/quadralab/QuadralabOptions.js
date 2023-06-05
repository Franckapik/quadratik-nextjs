import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CardOptions } from "../CardOptions";
import ProductOptions from "../ProductOptions";

const QuadralabOptions = ({ product, height, changeAttributes }) => {
  return (
    <CardOptions title="parametres" opened={height > 700 ? "1" : "0"}>
      <ProductOptions product={product} changeAttributes={changeAttributes} />
    </CardOptions>
  );
};

export default QuadralabOptions;
