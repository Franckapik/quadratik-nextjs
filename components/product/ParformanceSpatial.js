import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

import { documentByFilename } from "../dolibarrApi/fetch";
import { useQuery } from "react-query";
import Image from "next/image";

export const PerformanceSpatial = ({ nom }) => {
  const [polarImg, setPolarImg] = useState(false);

  const { data: polar, isSuccess: polarSucceed } = useQuery(["polar", { name: nom }], () => documentByFilename("Polar/" + nom + ".png"), { staleTime: Infinity, enabled: !!nom && nom != undefined });

  useEffect(() => {
    if (polarSucceed) {
      setPolarImg(polar);
    }
  }, [polarSucceed]);

  return (
      <Row className="">
        {polarSucceed && polarImg? <Image style={{objectFit: "contain"}} src={`data:image/jpeg;base64,${polarImg}`} width={887} height={627} /> : "Ce modèle ne dispose pas encore de données techniques. Vous pouvez vous renseigner sur ce produit via la rubrique Contact "}
      </Row>
  );
};
