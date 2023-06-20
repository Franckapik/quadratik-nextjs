import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { Field } from "../product/Field";

const ProductOptions = ({ product, changeAttributes }) => {
  const [mode, setMode] = useToggle(true);
  const methods = useFormContext();

  useEffect(() => {
    const subscription = methods.watch((value, {name}) => {
      changeAttributes(value, name);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);
console.log(product);
  const options = product.description && JSON.parse(product.description?.attributes_options);

  return (
    <>
      <Form.Group>
        <Button variant="outline-light" size="sm" onClick={() => setMode()}>
          {mode ? "Mode Basique" : "Mode Avancé"}
        </Button>
        <Form.Group className=" p-2" controlId="product_simple">
          {Object.entries(options.simple).map((a, i) => {
            const id = a[0];
            const type = a[1];
            const att = Object.values(product.allAttributes).filter((x) => x.ref === a[0])[0];
            const values = product.values.filter((a) => a.a_id == att.id);
            return <Field id={att.id} type={mode ? type : "hidden"} key={"Field" + i} values={values} label={att.label} defaultVal={product.valuesSelected[a[0]]}></Field>;
          })}
        </Form.Group>
        <Form.Group className=" p-2" controlId="product_advanced">
          {Object.entries(options.advanced).map((a, i) => {
            const id = a[0];
            const type = a[1];
            const att = Object.values(product.allAttributes).filter((x) => x.ref === a[0])[0];
            const values = product.values.filter((a) => a.a_id == att.id);
            return <Field id={att.id} type={mode ? "hidden" : type} key={"Field" + i} values={values} label={att.label} defaultVal={product.valuesSelected[a[0]]}></Field>;
          })}
        </Form.Group>
      </Form.Group>
    </>
  );
};

export default ProductOptions;
