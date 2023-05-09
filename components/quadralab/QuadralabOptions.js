import { queryTypes, useQueryStates } from "next-usequerystate";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useProductStore } from "../../hooks/store";
import { useNomenclature } from "../../hooks/useNomenclature";
import { usePrice } from "../../hooks/usePrice";
import { useSizes } from "../../hooks/useSizes";
import useToggle from "../../hooks/useToggle";
import { Field } from "./Field";
import { CardOptions } from "../product/CardOptions";

const QuadralabOptions = ({ attributes, defaultProduct, setLoading }) => {
  const [mode, setMode] = useToggle(true);
  const defaultValuesQuery = Object.values(attributes).reduce((prev, cur) => {
    const isNotIdValue = ["W", "P"];
    if (!isNotIdValue.includes(cur.a_ref)) {
      return { ...prev, [cur.a_ref]: queryTypes.string.withDefault(cur.values[0]?.v_id) };
    } else {
      return { ...prev, [cur.a_ref]: queryTypes.string.withDefault(0) };
    }
  }, 0);

  const [valuesSelected, setValuesSelected] = useQueryStates(defaultValuesQuery, {
    history: "push",
  });

  //global states
  const nomenclature = useNomenclature(valuesSelected, 1, attributes, true);
  usePrice(valuesSelected, defaultProduct, attributes, true);
  useSizes(valuesSelected, attributes, true);

  //render Modele after ProductOptions
  useEffect(() => {
    if (nomenclature) {
      setLoading(false);
    }
  }, [nomenclature]);

  useEffect(() => {
    useProductStore.setState({ valuesSelected: valuesSelected });
  }, [valuesSelected]);

  const methods = useFormContext();

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setValuesSelected(() => ({ ...value }));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
      <CardOptions title="parametres" opened="0" className="quadralab_params_left ">
        <Form.Group className="" controlId="product_simple">
          {Object.entries(defaultProduct.attributes.quadralab.simple).map((a, i) => {
            const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
            return <Field id={a[0]} type={mode ? a[1] : "hidden"} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
          })}
        </Form.Group>

        <Form.Group className="" controlId="product_advanced">
          {Object.entries(defaultProduct.attributes.quadralab.advanced).map((a, i) => {
            const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
            if (a[1].includes("[")) {
              const rangeArray = a[1].replace("range", "").replace("[", "").replace("]", "").split(",");
              return <Field id={a[0]} type={!mode ? "notIdRange" : "hidden"} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={rangeArray[2]}></Field>;
            } else {
              return <Field id={a[0]} type={!mode ? a[1] : "hidden"} key={"FieldAdvanced" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
            }
          })}
        </Form.Group>
      </CardOptions>
  );
};

export default QuadralabOptions;
