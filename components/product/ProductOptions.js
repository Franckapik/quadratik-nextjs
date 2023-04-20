import { queryTypes, useQueryStates } from "next-usequerystate";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { variantPost } from "../dolibarrApi/post";
import { Field } from "./Field";
import { usePrice } from "../../hooks/usePrice";
import { useNomenclature } from "../../hooks/useNomenclature";
import { useProductStore } from "../../hooks/store";
import { useSizes } from "../../hooks/useSizes";

const ProductOptions = ({ attributes, defaultProduct, setLoading }) => {
  const [variant, setVariant] = useState({});
  const [mode, setMode] = useToggle(true);

  const defaultValuesQuery = Object.values(attributes).reduce((prev, cur) => {
    return { ...prev, [cur.a_ref]: queryTypes.string.withDefault(cur.values[0]?.v_id) };
  }, 0);

  const [valuesSelected, setValuesSelected] = useQueryStates(defaultValuesQuery, {
    history: "push",
  });

  //global states
  const nomenclature = useNomenclature(valuesSelected, defaultProduct, attributes);
  const [price, basePrice] = usePrice(valuesSelected, defaultProduct, attributes);
  const [sizes] = useSizes(valuesSelected, attributes);

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
      reference: nomenclature.structurel,
      ref_ext: nomenclature.complet,
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
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {mode ? (
          <Form.Group className="product_select_options" controlId="media_category_id_id">
            {Object.entries(defaultProduct.attributes.simple).map((a, i) => {
              const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
              return <Field id={a[0]} type={a[1]} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
            })}
          </Form.Group>
        ) : (
          <Form.Group className="product_select_options" controlId="media_category_id_id">
            {Object.entries(defaultProduct.attributes.advanced).map((a, i) => {
              const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
              return <Field id={a[0]} type={a[1]}  key={"FieldAdvanced" + i} values={attribute.values} label={attribute.a_label}></Field>;
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
