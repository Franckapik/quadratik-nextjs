import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { documentByFilename, documentByProductId } from "../dolibarrApi/fetch";
import { useNomenclature } from "../../hooks/useNomenclature";
import { useFetchDefaultProduct } from "../../hooks/useFetchDefaultProduct";
import Link from "next/link";
import { CardWrap } from "./CardWrap";
import { usePrice } from "../../hooks/usePrice";

export const CardProduct = ({ variant, childCat, attributes }) => {
  const nomenclature = useNomenclature(variant.valuesSelected, childCat.fk_parent, attributes);
  const [productImg, setProductImg] = useState();
  const [error, setError] = useState(false);
  const defaultProduct = useFetchDefaultProduct(childCat.fk_parent);
const price =   usePrice(variant.valuesSelected,  defaultProduct, attributes);

console.log(price);
  useEffect(() => {
    if (nomenclature) {
      documentByFilename("Modeles/Miniature/" + nomenclature.simple + ".png")
        .get()
        .then((response) => {
          setProductImg(response.data.content);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [nomenclature]);

  return (
    <CardWrap>
      <Link href={{ pathname: "/shop/product", query: {"Display" : 0, "TAG" : childCat.fk_parent, ...variant.valuesSelected} }}>
        {!error && productImg ? <img src={`data:image/png;base64,${productImg}`} /> : "Image non disponible" }
        <span className="shop_product_title ft2 ">{nomenclature.simple}</span>
        <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCat.label}</span>
        <span className="shop_product_price ft4 text-uppercase text-nowrap ">{Math.round(price[0])} €</span>
      </Link>
    </CardWrap>
  );
};
