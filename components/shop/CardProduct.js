import React from "react";
import { useProduct } from "../../hooks/useProduct";
import { CardWrap } from "./CardWrap";
import Link from "next/link";

export const CardProduct = ({ variantId, defaultProductId, childCatId, childCatLabel }) => {
  const { product, isSuccess } = useProduct(variantId, defaultProductId, childCatId);
  return (
    <>
      {isSuccess ? (
        <CardWrap>
          <Link href={{ pathname: "/shop/product", query: { TAG: childCatId, childCat: childCatId, ...product.valuesSelected, vid : variantId, dpid : defaultProductId } }}>
            {product?.image?.facePicture ? <img src={`data:image/png;base64,${product.image.facePicture}`} /> : "Image non disponible"}
            <span className="shop_product_title ft2 ">{product.nomenclature.simple}</span>
            <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCatLabel}</span>
            <span className="shop_product_price ft4  text-nowrap ">{product.prices ? product.prices.price + " €" : "Prix non disponible"} </span>
          </Link>
        </CardWrap>
      ) : null}
    </>
  );
};
