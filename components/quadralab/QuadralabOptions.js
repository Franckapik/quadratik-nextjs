import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import ProductOptions from "../ProductOptions";
import { CardOptions } from "../CardOptions";

const QuadralabOptions = ({ product, height, changeAttributes }) => {
  const [mode, setMode] = useToggle(true);

  const methods = useFormContext();

  useEffect(() => {
    const subscription = methods.watch((value) => {
      /*       setValuesSelected(() => ({ ...value }));
       */
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <CardOptions title="parametres" opened={height > 700 ? "1" : "0"}>
      <ProductOptions product={product} changeAttributes={changeAttributes} />
    </CardOptions>
  );
};

export default QuadralabOptions;
