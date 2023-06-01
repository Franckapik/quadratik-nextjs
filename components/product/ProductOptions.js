import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { Field } from "./Field";
import { useQuery } from "react-query";
import { attributesAllFetch } from "../dolibarrApi/fetch";

const ProductOptions = ({ product }) => {
  const [mode, setMode] = useToggle(true);
  const methods = useFormContext();

  const { data: allAttributes, isSuccess: allAttributesSucceed } = useQuery(
    ["attributes"],
    () =>
      attributesAllFetch()
        .get()
        .then((response) => response.data),
    { staleTime: Infinity }
  );

  useEffect(() => {
    const subscription = methods.watch((value) => {
      /* setValuesSelected(() => ({ ...value })); */
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Form.Group>
        {" "}
        <Button variant="outline-dark" size="sm" onClick={() => setMode()}>
          {mode ? "Mode Basique" : "Mode Avancé"}
        </Button>
        <Form.Group className=" p-2" controlId="product_simple">
          {Object.entries(product.description.attributes_options.simple).map((a, i) => {
            const id = a[0];
            const type = a[1];
            const att = Object.values(allAttributes).filter((x) => x.ref === a[0])[0];
            const values = product.values.filter((a) => a.a_id == att.id);
            return <Field id={id} type={mode ? type : "hidden"} key={"Field" + i} values={values} label={att.label} defaultVal={product.valuesSelected[a[0]]}></Field>;
          })}
        </Form.Group>
        <Form.Group className=" p-2" controlId="product_advanced">
          {Object.entries(product.description.attributes_options.advanced).map((a, i) => {
            const id = a[0];
            const type = a[1];
            const att = Object.values(allAttributes).filter((x) => x.ref === a[0])[0];
            const values = product.values.filter((a) => a.a_id == att.id);
            return <Field id={id} type={mode ? "hidden" : type} key={"Field" + i} values={values} label={att.label} defaultVal={product.valuesSelected[a[0]]}></Field>;
          })}
        </Form.Group>
      </Form.Group>
    </>
  );
};

export default ProductOptions;

/* const ProductOptions = ({ product }) => {
  const [mode, setMode] = useToggle(true);

  const [valuesSelected, setValuesSelected] = useQueryStates(product.valuesSelected, {
    history: "push",
  });



  useEffect(() => {
    const subscription = methods.watch((value) => {
      setValuesSelected(() => ({ ...value }));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {defaultProduct ? (
        <Form.Group>
          {" "}
          <Button variant="outline-dark" size="sm" onClick={() => setMode()}>
            {mode ? "Mode Basique" : "Mode Avancé"}
          </Button>
          <Form.Group className=" p-2" controlId="product_simple">
            {Object.entries(defaultProduct.attributes.simple).map((a, i) => {
              const attribute = Object.values(product.attributes).filter((x) => x.a_ref === a[0])[0];
              return <Field id={a[0]} type={mode ? a[1] : "hidden"} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
            })}
          </Form.Group>
          <Form.Group className=" p-2" controlId="product_advanced">
            {Object.entries(defaultProduct.attributes.advanced).map((a, i) => {
              const attribute = Object.values(product.attributes).filter((x) => x.a_ref === a[0])[0];
              return <Field id={a[0]} type={!mode ? a[1] : "hidden"} key={"FieldAdvanced" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
            })}
          </Form.Group>
        </Form.Group>
      ) : (
        "Aucun produit par default selectionné"
      )}
    </>
  );
};
export default ProductOptions; */
