import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { documentByProductId } from "../dolibarrApi/fetch";
import { useNomenclature } from "../../hooks/useNomenclature";
import Link from "next/link";


export const CardProduct = ({ product, subcategory, attributes }) => {
  const nomenclature = useNomenclature(product.valuesSelected, subcategory.fk_parent, attributes);

  const [document, setDocument] = useState(false);
  useEffect(() => {
    if (product?.id) {
      documentByProductId(product.id)
        .get()
        .then((response) => {
          setDocument(response.data);
        })
        .catch((error) => {
          /* console.log(error); */
        });
    }
  }, [product]);

  return (
    <>
      {true ? (
        <Col md={4} className="shop_card_col d-flex flex-column align-items-center justify-content-evenly">
          <Row className="p-3">{document?.ecmfiles_infos ? <img src={"http://shop.quadratik.fr/document.php?hashp=" + document?.ecmfiles_infos[0].share} /> : "pas d'image"}</Row>
          <Row className="text-center p-3 ft5 shop_card_price text_dark ">{/*          <span>{product.ref}</span> */}</Row>
          <Row className="text-center p-3 ft2 ">
            <Link href={{ pathname: "/shop/product", query: product.valuesSelected }}>
              <span>{nomenclature.simple}</span>
            </Link>

            <span>{Math.round(product.price)} €</span>
          </Row>
        </Col>
      ) : (
        "image de remplacement"
      )}
    </>
  );
};
