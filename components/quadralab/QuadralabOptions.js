import { queryTypes, useQueryStates } from "next-usequerystate";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import useToggle from "../../hooks/useToggle";
import { variantPost } from "../dolibarrApi/post";
import { Field } from "./Field";
import { usePrice } from "../../hooks/usePrice";
import { useNomenclature } from "../../hooks/useNomenclature";
import { useProductStore } from "../../hooks/store";
import { useSizes } from "../../hooks/useSizes";

const QuadralabOptions = ({ attributes, defaultProduct, setLoading }) => {
  const [mode, setMode] = useToggle(true);

  const defaultValuesQuery = Object.values(attributes).reduce((prev, cur) => {
    return { ...prev, [cur.a_ref]: queryTypes.string.withDefault(cur.values[0]?.v_id) };
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
      console.log(nomenclature);
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
    <Row className="quadralab_attributes_col flex-nowrap align-items-center">
      <Col md={2} className="h-100" onClick={() => setMode()}>
        <div className="quadralab_arrow">
          <i className="fad fa-chevron-left "></i>
        </div>
      </Col>
      <Col md={10}>
        <Row className="quadralab_game_border quadralab_params bg_darker">
          {mode ? (
            <Form.Group className="">
              <p>
                <Form.Label>Modèle</Form.Label>
              </p>
              {Object.entries(defaultProduct.attributes.quadralab.simple).map((a, i) => {
                const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
                return <Field id={a[0]} type={a[1]} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
              })}{" "}
            </Form.Group>
          ) : (
            <Form.Group className="">
              <p>
                <Form.Label>Parametres avancés</Form.Label>
              </p>
              {Object.entries(defaultProduct.attributes.quadralab.advanced).map((a, i) => {
                const attribute = Object.values(attributes).filter((x) => x.a_ref === a[0])[0];
                return <Field id={a[0]} type={a[1]} key={"Field" + i} values={attribute.values} label={attribute.a_label} defaultVal={valuesSelected[a[0]]}></Field>;
              })}
            </Form.Group>
          )}
        </Row>
      </Col>
      <Col md={2} className="h-100" onClick={() => setMode()}>
        {" "}
        <div className="quadralab_arrow">
          <i className="fad fa-chevron-right "></i>
        </div>
      </Col>
    </Row>
  );
};

export default QuadralabOptions;
