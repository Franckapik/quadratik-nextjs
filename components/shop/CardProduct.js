import React from "react";
import { useProduct } from "../../hooks/useProduct";
import { CardWrap } from "./CardWrap";

export const CardProduct = ({ variantId, defaultProductId, childCatId, childCatLabel }) => {
  const { product, isSuccess } = useProduct(variantId, defaultProductId, childCatId);
  return (
    <>
      {isSuccess ? (
        <CardWrap>
          <img src={`data:image/png;base64,${product.image.facePicture}`} />
          <span className="shop_product_title ft2 ">{product.nomenclature.simple}</span>
          <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCatLabel}</span>
          <span className="shop_product_price ft4  text-nowrap ">{product.price ? product.price + " €" : "Prix non disponible"} </span>
        </CardWrap>
      ) : null}
    </>
  );
};
