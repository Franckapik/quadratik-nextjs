import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { Field } from "./Field";
import { useQuery } from "react-query";
import { attributesAllFetch } from "../dolibarrApi/fetch";

const ProductOptions = ({ product, setProduct }) => {
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
    const subscription = methods.watch((value, {name}) => {
      const newAttributes = product.attributes;
      const objIndex = newAttributes.findIndex((obj => obj.id == name));
      newAttributes[objIndex].fk_prod_attr_val = value[name];
      setProduct((prevProduct) => ({ ...prevProduct, attributes : newAttributes }));
    });
    return () => subscription.unsubscribe();
  }, []);

  const options = JSON.parse(product.description.attributes_options);

  return (
    <>
      <Form.Group>
        {" "}
        <Button variant="outline-dark" size="sm" onClick={() => setMode()}>
          {mode ? "Mode Basique" : "Mode Avancé"}
        </Button>
        <Form.Group className=" p-2" controlId="product_simple">
          {Object.entries(options.simple).map((a, i) => {
            const id = a[0];
            const type = a[1];
            const att = Object.values(allAttributes).filter((x) => x.ref === a[0])[0];
            const values = product.values.filter((a) => a.a_id == att.id);
            return <Field id={att.id} type={mode ? type : "hidden"} key={"Field" + i} values={values} label={att.label} defaultVal={product.valuesSelected[a[0]]}></Field>;
          })}
        </Form.Group>
        <Form.Group className=" p-2" controlId="product_advanced">
          {Object.entries(options.advanced).map((a, i) => {
            const id = a[0];
            const type = a[1];
            const att = Object.values(allAttributes).filter((x) => x.ref === a[0])[0];
            const values = product.values.filter((a) => a.a_id == att.id);
            return <Field id={att.id} type={mode ? "hidden" : type} key={"Field" + i} values={values} label={att.label} defaultVal={product.valuesSelected[a[0]]}></Field>;
          })}
        </Form.Group>
      </Form.Group>
    </>
  );
};

export default ProductOptions;
