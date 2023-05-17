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

const ProductOptions = ({ attributes, defaultProduct, setLoading }) => {
  const tag = useProductStore.getState().tag;
  const [mode, setMode] = useToggle(true);

  const defaultValuesQuery = Object.values(attributes).reduce((prev, cur) => {
    return { ...prev, [cur.a_ref]: queryTypes.string.withDefault(cur.values[0]?.v_id) };
  }, 0);


  const [valuesSelected, setValuesSelected] = useQueryStates(defaultValuesQuery, {
    history: "push",
  });

  //global states
  const nomenclature = useNomenclature(valuesSelected, 1, attributes, true);
  usePrice(valuesSelected, defaultProduct, attributes, true);
  useSizes(valuesSelected, attributes, true);

  //render Modele after ProductOptions
  useEffect(() => {
    if (nomenclature) {
      setLoading(false);
    }
  }, [nomenclature]);

  useEffect(() => {
    useProductStore.setState({ valuesSelected: valuesSelected });
  }, [valuesSelected]);

  const methods = useFormContext();

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setValuesSelected(() => ({ ...value }));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <CardOptions title="options" opened="0" className={"product_options"} >
            <Form.Group>
              <Button variant="secondary" onClick={() => setMode()}>
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

    </CardOptions>
  );
};
export default ProductOptions;
