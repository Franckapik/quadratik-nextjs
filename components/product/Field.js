import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

export const Field = ({ label, id, type, values }) => {
  const { control } = useFormContext();

  return (
    <>
      <Form.Label htmlFor="disabledTextInput">{label}</Form.Label>
      <Controller
        control={control}
        rules={{
          required: "Ce champ est manquant",
        }}
        name={id}
        render={({ field }) => {
          switch (type) {
            case "switch":
              return <Form.Check {...field} type={type} id="custom-switch" label={label} />;
              break;
            case "radio":
              return (
                <div key={`inline-${type}`} className="mb-3">
                  {Object.values(values).map((a, i) => (
                    <Form.Check {...field} inline label={a.v_label} name="group" type={type} id={`inline-${type}-1`} />
                  ))}
                </div>
              );

              break;
            case "select":
              return (
                <Form.Select {...field}>
                  {Object.values(values).map((a, i) => (
                    <option value={a.v_id} selected>
                      {a.v_label}
                    </option>
                  ))}
                </Form.Select>
              );
              break;
            case "range":
              return (
                <>
                  <Form.Range min={-6} max={6} />
                </>
              );
              break;

            default:
              break;
          }
        }} />
    </>
  );
};
