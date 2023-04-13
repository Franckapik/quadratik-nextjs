import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { variantPost } from "../dolibarrApi/post";

const Select_Options = ({ values, attributes, notInForm, setValuesSelected, nomenclature, product, prices, valuesSelected }) => {
  const { handleSubmit, control, reset, watch } = useForm();
  const [variant, setVariant] = useState({});
  const [mode, setMode] = useToggle();

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

  useEffect(() => {
    const subscription = watch((valuesSelected) => {
      setValuesSelected((prevValuesSelected) => ({ ...prevValuesSelected, ...valuesSelected }));
    });
    return () => subscription.unsubscribe();
  }, []);


  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      {mode ? (
        attributes.map((a, i) => {
          if (!notInForm.includes(a.ref)) {
            const valuesFromAttributeId = values.filter((v, i) => v.fk_product_attribute == a.id);
            return (
              <Form.Group className="product_select_options" /* style={{visibility : mode === "advanced" ? "hidden" : "visible"}} */ controlId="media_category_id_id">
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
          }
        })
      ) : (
        <Form.Group className="product_select_options" /* style={{visibility : mode === "advanced" ? "hidden" : "visible"}} */ controlId="media_category_id_id">
          <Form.Label htmlFor="disabledTextInput">Motif</Form.Label>

          {/*   
                        <ul>
                          <li onClick={() => setProduct((prevProduct) => ( {...prevProduct, C: 0} ))}>Motif0</li>
                          <li onClick={() => setProduct((prevProduct) => ( {...prevProduct, C: 1} ))}>Motif1</li>
                          <li onClick={() => setProduct((prevProduct) => ( {...prevProduct, C: 2} ))}>Motif2</li>
                          <li onClick={() => setProduct((prevProduct) => ( {...prevProduct, I: !prevProduct.I } ))}>Invert</li>
                          <li
                            onClick={() => {
                              console.log(p3d.N)
                              switch (p3d.N) {
                                case "7":
                                  setProduct((prevProduct) => ( {...prevProduct, H: -3, V : -3 } ))
                                  break;
                                case "11":
                                  setProduct((prevProduct) => ( {...prevProduct, H: 6, V : -5 } ))
                                  break;
                                case "13":
                                  setProduct((prevProduct) => ( {...prevProduct, H: -6, V : -6 } ))
                                  break;

                                default:
                                  break;
                              }
                            }}
                          >
                            Optimiser
                          </li>
                        </ul>
                        {p3d && <DiffusorOffset p3d={p3d} setProduct={setProduct}></DiffusorOffset>} */}
          <Controller
            control={control}
            rules={{
              required: "Ce champ est manquant",
            }}
            name={"I"}
            defaultValue={valuesSelected["I"]}
            render={({ field }) => <Form.Check {...field} type="switch" id="custom-switch" label="Modèle inversé" />}
          />

        </Form.Group>
      )}

      <span onClick={() => setMode()} className="">
        Options avancées
      </span>
      <Button variant="primary" type="submit" className="m-auto mt-4">
        Ajouter au panier
      </Button>
      {/*    <Button variant="secondary" >
        Configurer
      </Button> */}
    </Form>
  );
};

export default Select_Options;
