import { queryTypes, useQueryStates } from "next-usequerystate";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { variantPost } from "../dolibarrApi/post";
import { Field } from "./Field";

const ProductOptions = ({ nomenclature, product, prices, attributes, defaultProduct }) => {
  const [variant, setVariant] = useState({});
  const [mode, setMode] = useToggle(true);

  const [valuesSelected, setValuesSelected] = useQueryStates(
    {
      PID: queryTypes.string.withDefault(8),
      TAG: queryTypes.string.withDefault("Diffuseurs"),
      P: queryTypes.string.withDefault(11),
      W: queryTypes.string.withDefault(25),
      L: queryTypes.string.withDefault(28),
      E: queryTypes.string.withDefault(22),
      N: queryTypes.integer.withDefault(14),
      C: queryTypes.integer.withDefault(0),
      I: queryTypes.boolean.withDefault(false),
      V: queryTypes.integer.withDefault(-3),
      H: queryTypes.integer.withDefault(-3),
      D: queryTypes.string.withDefault(36),
      M: queryTypes.string.withDefault(38),
    },
    {
      history: "push",
    }
  );

  useEffect(() => {
    if (product) {
      const keys = Object.keys(product);
      const features = keys.reduce((acc, item) => {
        if (product[item].id !== undefined) {
          return {
            ...acc,
            [product[item].attribute_id]: product[item].id,
          };
        }
        return acc;
      }, {});

      const variant = {
        weight_impact: 0,
        price_impact: prices[1] - prices[0],
        price_impact_is_percent: false,
        features: features,
        reference: nomenclature.structurel,
        ref_ext: nomenclature.complet,
      };

      setVariant(variant);
    }
  }, [product, prices, nomenclature]);

  const onSubmit = async (data) => {
    console.log(variant);
    variantPost(product.PID)
      .post("", variant)
      .then((response) => {
        console.log("Ajout du variant [ID]:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*   useEffect(() => {
    const subscription = watch((valuesSelected) => {
      setValuesSelected((prevValuesSelected) => ({ ...prevValuesSelected, ...valuesSelected }));
    });
    return () => subscription.unsubscribe();
  }, []); */

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {mode ? (
          <Form.Group className="product_select_options" controlId="media_category_id_id">
            {Object.entries(defaultProduct.attributes.simple).map((a, i) => {
              const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
              return <Field id={a[0]} type={a[1]} values={attribute.values} label={attribute.a_label}></Field>;
            })}
          </Form.Group>
        ) : (
          <Form.Group className="product_select_options" controlId="media_category_id_id">
            {Object.entries(defaultProduct.attributes.advanced).map((a, i) => {
              const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
              return <Field id={a[0]} type={a[1]} values={attribute.values} label={attribute.a_label}></Field>;
            })}
          </Form.Group>
        )}
        <span onClick={() => setMode()} className="">
          Options avancées
        </span>
        <Button variant="primary" type="submit" className="m-auto mt-4">
          Ajouter au panier
        </Button>
      </Form>
    </FormProvider>
  );
};

export default ProductOptions;
