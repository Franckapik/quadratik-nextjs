import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { documentByProductId, objectsInCategory } from "../../components/dolibarrApi/fetch";

export const DefaultProduct = ({ tagId }) => {
  const [defaultProduct, setDefaultProduct] = useState(false);
  const [document, setDocument] = useState(false);

  useEffect(() => {
    objectsInCategory(tagId)
      .get()
      .then((response) => {
        setDefaultProduct(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tagId]);

  useEffect(() => {
    if (defaultProduct?.id) {
      documentByProductId(defaultProduct.id)
        .get()
        .then((response) => {
          console.log(response.data);
          setDocument(response.data.ecmfiles_infos[response.data.ecmfiles_infos.length - 1]); //issue with historical old file
        })
        .catch((error) => {
          setDocument(false); //issue with historical old file

          /*           console.log(error);
           */ 
        })
    }
  }, [defaultProduct]);

  return (
    <>
      {defaultProduct && document ? (
        <Col className=" d-flex flex-column w-100 justify-content-evenly align-item-center">
          <Row className="shop_default_row">{document ? <img src={"http://shop.quadratik.fr/document.php?hashp=" + document.share} /> : "pas d'image"}</Row>
          <Row className="text-end m-2 ft2 ">
            <span> La référence : {defaultProduct.ref}</span>
          </Row>
        </Col>
      ) : (
        "image de remplacement"
      )}
    </>
  );
};
