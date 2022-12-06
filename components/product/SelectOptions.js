import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { attributesFetch } from "../dolibarrApi/fetch";

const Select_Options = ({ setProduct, product, setPrice, price }) => {
  const [loading, setLoading] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState([]);

  const { handleSubmit, control, reset, watch } = useForm();
  const onSubmit = async (data) => {};

  const attributesAdvanced = ["H", "V", "I", "C"];


  const calculatePrice = (prices, prixBase) =>
  prices.reduce((total, item) => {
    if((item.attribute === "N") ||( item.attribute === "P")) {
      return total;
    } else {
      switch (item.operation) {
        case "multiplication":
          total += (item.value - 1) * prixBase;
          break;
  
        case "addition":
          total += item.value * prixBase;
          break;
  
        default:
          console.log("Strategie de calcul de prix non repertoriée");
      }
      return total;
    }
   
  }, prixBase);

  useEffect(() => {
    attributesFetch.get("?sortfield=t.ref&sortorder=ASC&limit=100").then((response) => {
      setAttributes(response.data);
    });
  }, []);

  useEffect(() => {
    Promise.all(
      attributes.map((a) => {
        if (!attributesAdvanced.includes(a.ref)) {
          return attributesFetch
            .get("/" + a.id + "/values")
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
    )
      .then((valuesData) => {
        const filteredValues = valuesData.filter((item) => item); //no undefined
        if (filteredValues.length > 0) {
          setValues(filteredValues);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, [attributes]);

  useEffect(() => {
    const subscription = watch((value) => {
      const produit3D = Object.entries(value)
        .map((a) => a.toString().split(","))
        .reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {});
      setProduct(produit3D);
      console.table(produit3D);

      const prices = Object.entries(value).map((a) => {
        const b = a
          .toString()
          .split(",")
          .map((item) => item.trim());
        return { "attribute" : b[0], "value" : parseFloat(b[3]), "operation" : b[4]};
      });

      const prixBase = product["N"] * product["P"]
      const prix = calculatePrice(prices, prixBase)
      setPrice(prix);

    });
    return () => subscription.unsubscribe();
  }, [watch, product]);

  console.log(values)

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      {loading && <div>Loading</div>}
      {price}
      {!loading &&
        attributes.map((a, i) => {
          if (!attributesAdvanced.includes(a.ref)) {
            const valueFromAttributeId = values
              .filter((v, i) => v[0].fk_product_attribute == a.id)[0]
              .map((a) => a.value.split(",")); //find for values from attribute id
            return (
              <Form.Group className="mb-3" controlId="media_category_id_id">
                <Form.Label htmlFor="disabledTextInput">{a.label}</Form.Label>
                <Controller
                  control={control}
                  rules={{
                    required: "Ce champ est manquant",
                  }}
                  name={a.ref}
                  defaultValue={valueFromAttributeId[0]}
                  render={({ field }) => (
                    <Form.Select {...field}>
                      {valueFromAttributeId.map((c) => {
                        const priceAdd = parseInt((c[2] - 1) * 50);
                        return (
                          <option value={[c]}>
                            {c[1]} {c[2]} {priceAdd > 0 ? "+ " + priceAdd + "€" : priceAdd + "€"}
                          </option>
                        );
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
    </Form>
  );
};

export default Select_Options;