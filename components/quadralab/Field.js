import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

export const Field = ({ label, id, type, values, defaultVal }) => {
  const { control } = useFormContext();

  console.log(values);

  const handleChange = (e) => {
    e.persist();
    console.log(e.target.value);

    /*     setItem(prevState => ({
      ...prevState,
      kindOfStand: e.target.value
    })); */
  };

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
          console.log(field);
          switch (type) {
            case "switch":
              return <Form.Check {...field} type={type} id="custom-switch" label={label} />;
              break;
            case "radio":
              return (
                  <Form.Group {...field} className="form_radio_inline">
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
            case "select":
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
        }}
      />
    </>
  );
};
