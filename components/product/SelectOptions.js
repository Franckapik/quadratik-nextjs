import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { variantPost } from "../dolibarrApi/post";

const Select_Options = ({
  values,
  attributes,
  notInForm,
  setValuesSelected,
  nomenclature,
  product,
  prices,
  valuesSelected,
}) => {
  const { handleSubmit, control, reset, watch } = useForm();
  const [variant, setVariant] = useState({});

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
        return acc
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
    variantPost(product.PID)
      .post("", variant)
      .then((response) => {
        console.log("Ajout du variant [ID]:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const subscription = watch((valuesSelected) => {
      setValuesSelected((prevValuesSelected) => ({ ...prevValuesSelected, ...valuesSelected }));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      {attributes.map((a, i) => {
        if (!notInForm.includes(a.ref)) {
          const valuesFromAttributeId = values.filter((v, i) => v.fk_product_attribute == a.id);
          return (
            <Form.Group className="mb-3" controlId="media_category_id_id">
              <Form.Label htmlFor="disabledTextInput">{a.label}</Form.Label>
              <Controller
                control={control}
                rules={{
                  required: "Ce champ est manquant",
                }}
                name={a.ref}
                defaultValue={valuesSelected[a.ref]}
                render={({ field }) => (
                  <Form.Select {...field}>
                    {valuesFromAttributeId.map((c) => {
                      if (c.id == valuesSelected[a.ref]) {
                        return (
                          <option value={c.id} selected>
                            {c.value.split(",")[1]}
                          </option>
                        );
                      } else {
                        return <option value={c.id}>{c.value.split(",")[1]}</option>;
                      }
                    })}
                  </Form.Select>
                )}
              />
            </Form.Group>
          );
        } else {
          return null;
        }
      })}
      <Button variant="outline-primary m-2" size="lg" type="submit">
        Ajouter au panier
      </Button>
      <Button variant="outline-secondary m-2" size="lg">
        Configurer
      </Button>{" "}
    </Form>
  );
};

export default Select_Options;
