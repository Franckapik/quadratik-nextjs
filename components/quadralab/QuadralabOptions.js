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

const QuadralabOptions = ({ attributes, defaultProduct, setLoading }) => {
  const [mode, setMode] = useToggle(true);
  const defaultValuesQuery = Object.values(attributes).reduce((prev, cur) => {
    const isNotIdValue = ["H", "V", "I"];
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

  useEffect(() => {
    methods.setValue("P", 10);
    methods.setValue("H", 0);
    methods.setValue("V", 0);
    methods.setValue("W", 50);
  }, []);

  return (
    <Row className="quadralab_params_left quadralab_game_border quadralab_params bg_darker">
      <Form.Group className="">
        <Row className="justify-content-center text-center">
          <p className="text-center w-100 mt-4 mb-4 p-3">
            <i className="fad fa-tools p-2"></i>PARAMETRES
          </p>

          <Row className=" justify-content-center flex-nowrap">
            <Col md={6}>
              <Button variant="secondary" onClick={() => setMode()}>
                {mode ? "Simples" : "Avancés"}
              </Button>
            </Col>
          </Row>
        </Row>
      </Form.Group>
      {mode ? (
        <Form.Group className="justify-content-center">
          {Object.entries(defaultProduct.attributes.quadralab.simple).map((a, i) => {
            const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
            return <Field id={a[0]} type={a[1]} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
          })}
        </Form.Group>
      ) : (
        <Form.Group className="">
          {Object.entries(defaultProduct.attributes.quadralab.advanced).map((a, i) => {
            const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
            let rangeArray;
            if (a[1].includes("range")) {
              rangeArray = a[1].replace("range", "").replace("[", "").replace("]", "").split(",");
              return <Field id={a[0]} type={a[1]} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={rangeArray[0]}></Field>;
            } else {
              return <Field id={a[0]} type={a[1]} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
            }
          })}
        </Form.Group>
      )}
    </Row>
  );
};

export default QuadralabOptions;
