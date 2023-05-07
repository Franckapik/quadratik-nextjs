import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

export const Field = ({ label, id, type, values, defaultVal }) => {
  const { control, setValue } = useFormContext();
  const [inverted, setInverted] = useState(0)

  useEffect(() => { // work around to avoid false issue submitting switch
    if (type === "switch") {
      setValue('I', inverted ? values[1].v_id : values[0].v_id)
    }
  }, [type, inverted]) 

  return (
    <>
      <Form.Label>{type === "radio" || type === "switch" ? null : label}</Form.Label>
      <Controller
        control={control}
        rules={{
          required: "Ce champ est manquant",
        }}
        name={id}
        defaultValue={defaultVal}
        render={({ field }) => {
          switch (true) {
            case type === "switch":
              return <Form.Check {...field} type={type} id={"switch" + label} label={label} onChange={() => setInverted(!inverted)} />;
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
              const rangeArray = type.replace("range", '').replace('[', '').replace(']', '').split(',');
              return (
                <>
                  <Form.Range {...field} min={rangeArray[0]} max={rangeArray[1]} />
                </>
              );
              break;

            default:
              break;
          }
        }}
      />
    </>
  );
};
