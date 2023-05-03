import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { DefaultProduct } from "./DefaultProduct";

export const ParentProduct = ({ categories, viewedCategory }) => {
  const [viewedParent, setViewedParent] = useState(false);

  useEffect(() => {
    setViewedParent(categories.filter((val) => val.id === viewedCategory)[0]);
  }, [viewedCategory]);

  return (
    <>
      {viewedParent && (
        <Row>
          <p>{viewedParent.label}</p>
          <p>{viewedParent.description}</p>
          <DefaultProduct tagId={viewedCategory}></DefaultProduct>
        </Row>
      )}
    </>
  );
};
