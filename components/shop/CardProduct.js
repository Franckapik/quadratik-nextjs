import React from "react";
import { useProduct } from "../../hooks/useProduct";
import { CardWrap } from "./CardWrap";
import Link from "next/link";
import { usePicture } from "../../hooks/usePicture";

export const CardProduct = ({ variantId, defaultProductId, childCatId, childCatLabel }) => {
  const { product, isSuccess } = useProduct(variantId, defaultProductId, childCatId);
  const { facePicture: facePicture, sidePicture: sidePicture, isSuccess: pictureSucceed } = usePicture(product.nomenclature.simple, true); //true for miniature

  return (
    <>
      {isSuccess ? (
        <CardWrap>
          <Link href={{ pathname: "/shop/product", query: {display : 0, childCat: childCatId, vid : variantId, dpid : defaultProductId } }}>
            {facePicture ? <img src={`data:image/png;base64,${facePicture}`} /> : "Image non disponible"}
            <span className="shop_product_title ft2 ">{product.nomenclature.simple}</span>
            <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCatLabel}</span>
            <span className="shop_product_price ft4  text-nowrap ">{product.prices ? product.prices.price + " €" : "Prix non disponible"} </span>
          </Link>
        </CardWrap>
      ) : null}
    </>
  );
};
