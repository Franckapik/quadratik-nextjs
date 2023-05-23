import { queryTypes, useQueryStates } from "next-usequerystate";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useProductStore } from "../../hooks/store";
import { useNomenclature } from "../../hooks/useNomenclature";
import { usePrice } from "../../hooks/usePrice";
import { useSizes } from "../../hooks/useSizes";
import useToggle from "../../hooks/useToggle";
import { CardOptions } from "./CardOptions";
import { Field } from "./Field";

const ProductOptions = ({ setValuesSelected }) => {
  const [mode, setMode] = useToggle(true);
  const methods = useFormContext();
  const defaultProduct = useProductStore(state => state.defaultProduct);
  const attributes = useProductStore(state => state.attributes);
  const valuesSelected = useProductStore(state => state.valuesSelected);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setValuesSelected(() => ({ ...value }));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
            <Form.Group>
              <Button  variant="outline-dark" size="sm"  onClick={() => setMode()}>
                {mode ? "Mode Basique" : "Mode Avancé"}
              </Button>

              <Form.Group className=" p-2" controlId="product_simple">
                {Object.entries(defaultProduct.attributes.simple).map((a, i) => {
                  const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
                  return <Field id={a[0]} type={mode ? a[1] : "hidden"} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
                })}
              </Form.Group>

              <Form.Group className=" p-2" controlId="product_advanced">
                {Object.entries(defaultProduct.attributes.advanced).map((a, i) => {
                  const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
                  return <Field id={a[0]} type={!mode ? a[1] : "hidden"} key={"FieldAdvanced" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
                })}
              </Form.Group>
            </Form.Group>

  );
};
export default ProductOptions;
