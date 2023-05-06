import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { documentByProductId } from "../dolibarrApi/fetch";
import { useNomenclature } from "../../hooks/useNomenclature";
import Link from "next/link";

export const CardProduct = ({ product, childCat, attributes }) => {
  const nomenclature = useNomenclature(product.valuesSelected, childCat.fk_parent, attributes);
  const [document, setDocument] = useState(false);
  useEffect(() => {
    if (product.id) {
      documentByProductId(product.id)
        .get()
        .then((response) => {
          setDocument(response.data);
        })
        .catch((error) => {
          console.log("Image manquante pour modele ", product.id);
        });
    }
  }, [product]);

  return (
    <>
      <Col className="shop_card m-2 d-flex flex-column justify-content-center align-items-center border_creme_light text_dark">
        <Link href={{ pathname: "/shop/product", query: product.valuesSelected }}>
          <img src={document?.ecmfiles_infos ? "http://shop.quadratik.fr/document.php?hashp=" + document?.ecmfiles_infos[0].share : "/shop/Anemone-7.png"} />
          <span className="shop_product_title ft2 ">{nomenclature.simple}</span>
          <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCat.label}</span>
          <span className="shop_product_price ft4 text-uppercase text-nowrap ">{Math.round(product.price)} €</span>
        </Link>{" "}
      </Col>
    </>
  );
};
