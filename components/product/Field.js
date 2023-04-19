import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

export const Field = ({ label, id, type, values, defaultVal }) => {
  const { control } = useFormContext();
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Controller
        control={control}
        rules={{
          required: "Ce champ est manquant",
        }}
        name={id}
        defaultValue={defaultVal}
        render={({ field }) => {
          switch (type) {
            case "switch":
              return <Form.Check {...field} type={type} id="custom-switch" label={label} />;
              break;
            case "radio":
              return (
                <div key={`inline-${type}`}  className="mb-3">
                  {Object.values(values).map((a, i) => (
                    <Form.Check label={a.v_label} type={type} name="group" id={`inline-${type}-${i}`} key={"FormCheck" + i} />
                  ))}
                </div>
              );

              break;
            case "select":
              return (
                <Form.Select {...field}>
                  {Object.values(values).map((a, i) => (
                    <option value={a.v_id} key={"Option_"+label + i}>
                      {a.v_label}
                    </option>
                  ))}
                </Form.Select>
              );
              break;
            case "range":
              return (
                <>
                  <Form.Range {...field} min={0} max={13} />
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
