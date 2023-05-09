import { queryTypes, useQueryStates } from "next-usequerystate";
import { useEffect, useState } from "react";
import { Button, Col, Collapse, Form, Row } from "react-bootstrap";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { variantPost } from "../dolibarrApi/post";
import { Field } from "./Field";
import { usePrice } from "../../hooks/usePrice";
import { useNomenclature } from "../../hooks/useNomenclature";
import { useProductStore } from "../../hooks/store";
import { useSizes } from "../../hooks/useSizes";
import { CardOptions } from "./CardOptions";

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
  const nomenclature = useNomenclature(valuesSelected, tag, attributes);
  const [price, basePrice] = usePrice(valuesSelected, defaultProduct, attributes);
  useSizes(valuesSelected, attributes);

  //render Modele after ProductOptions
  useEffect(() => {
    if (nomenclature) {
      setLoading(false);
    }
  }, [nomenclature]);

  useEffect(() => {
    useProductStore.setState({ valuesSelected: valuesSelected });
  }, [valuesSelected]);

  const onSubmit = async (data) => {
    const features = Object.entries(data).reduce((acc, [i, a] = cur) => {
      const getAttributeRef = Object.values(attributes).filter((val) => val.a_ref === i)[0];
      return {
        ...acc,
        [getAttributeRef.a_id]: a,
      };
    }, {});

    const variant = {
      weight_impact: 0,
      price_impact: price - basePrice,
      price_impact_is_percent: false,
      features: features,
      reference: nomenclature?.complet,
      ref_ext: nomenclature?.simple,
    };

    variantPost(defaultProduct.id)
      .post("", variant)
      .then((response) => {
        console.log("Ajout du variant [ID]:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const methods = useForm();

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setValuesSelected(() => ({ ...value }));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <CardOptions title="options" opened="0" >
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} className="justify-content-center text-center ">
          <Collapse in={open}>
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
          </Collapse>{" "}
        </Form>
      </FormProvider>
    </CardOptions>
  );
};
{
  /* 
        <p onClick={() => methods.reset()} className="text-center mt-4">
          -- Reset --
        </p> */
}
{
  /* 
        <Row className="product_button_add_basket justify-content-center">
          <Row className="product_ref text-center">
            <p>REF : {nomenclature?.structurel}</p>
             <p className=" ft1 mt-3 text_green bg_darker">{price + " €"}</p>
          </Row>
          <Button variant="primary" type="submit" id="product_submit" className="mt-4">
            Ajouter au panier
          </Button>
        </Row> */
}
export default ProductOptions;
