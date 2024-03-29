import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

import { documentByFilename } from "../dolibarrApi/fetch";

export const PerformanceSpatial = ({ nomenclature }) => {
  const [polarImg, setPolarImg] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (nomenclature) {
      documentByFilename("Polar/" + nomenclature.performance + ".png")
        .then((response) => {
          setPolarImg(response);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [nomenclature]);

  return (
      <Row className="">
        {!error && polarImg ? <img src={`data:image/jpeg;base64,${polarImg}`}></img> : "Ce modèle ne dispose pas encore de données techniques. Vous pouvez vous renseigner sur ce produit via la rubrique Contact "}
      </Row>
  );
};
