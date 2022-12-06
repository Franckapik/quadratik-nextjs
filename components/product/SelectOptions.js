import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

const Select_Options = ({ values, attributes, attributesAdvanced, setValuesSelected }) => {


  const { handleSubmit, control, reset, watch } = useForm();
  const onSubmit = async (data) => {};

  useEffect(() => {
    const subscription = watch((valuesSelected) => {
      setValuesSelected(valuesSelected)
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      {
        attributes.map((a, i) => {
          if (!attributesAdvanced.includes(a.ref)) {
            const valuesFromAttributeId = values
              .filter((v, i) => v.fk_product_attribute == a.id)
            return (
              <Form.Group className="mb-3" controlId="media_category_id_id">
                <Form.Label htmlFor="disabledTextInput">{a.label}</Form.Label>
                <Controller
                  control={control}
                  rules={{
                    required: "Ce champ est manquant",
                  }}
                  name={a.ref}
                  defaultValue={valuesFromAttributeId[0].id}
                  render={({ field }) => (
                    <Form.Select {...field}>
                      {valuesFromAttributeId.map((c) => {
                        return (
                          <option value={c.id}>
                            {c.value.split(",")[1]}
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