import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

export const Field = ({ label, id, type, values, defaultVal, changeAttributes }) => {
  const { control, setValue } = useFormContext();

  return (
    <>
      <Form.Label>{type === "radio" || type === "switch" || type === "hidden" ? null : label}</Form.Label>
      <Controller
        control={control}
        rules={{
          required: "Ce champ est manquant",
        }}
        name={id}
        defaultValue={defaultVal}
        render={({ field: { onChange, value, ref }, field }) => {
          switch (true) {
            case type === "switch":
              return <Form.Check onChange={(e) => setValue(id, e.target.checked ? values[0].v_id : values[1].v_id)} ref={ref} type={type} id={"switch" + label} label={label} />;
              break;
            case type === "radio":
              return (
                <Form.Group {...field} className="form_radio_inline justify-content-center m-4">
                  {Object.values(values).map((a, i) => (
                    <Form.Check type={type} key={"radio" + i}>
                      <Form.Check.Label className="border_creme">
                        <Form.Check.Input type={type} value={a.v_id} checked={field.value === a.v_id} />
                        {a.v_label}
                      </Form.Check.Label>
                    </Form.Check>
                  ))}
                </Form.Group>
              );

              break;
            case type === "select":
              return (
                <Form.Select {...field}>
                  {Object.values(values).map((a, i) => (
                    <option value={a.v_id} key={"Option_" + label + i}>
                      {a.v_label}
                    </option>
                  ))}
                </Form.Select>
              );
              break;
            case type.includes("range"):
              return <Form.Range onChange={(e) => setValue(id, values[e.target.value].v_id)} ref={ref} min={values[0].v_3d} max={values[Object.keys(values).length - 1].v_3d} />;
              break;
            case type.includes("number"):
              return <Form.Control type="number" defaultValue={values[0].v_3d} onChange={(e) => setValue(id, `notId:${e.target.value}`)}  ref={ref}  min={values[0].v_3d} max={values[Object.keys(values).length - 1].v_3d}  />;
              break;

            default:
              break;
          }
        }}
      />
    </>
  );
};
