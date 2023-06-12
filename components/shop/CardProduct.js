import React from "react";
import { CardWrap } from "./CardWrap";
import Link from "next/link";
import { usePicture } from "../../hooks/usePicture";
import { useFetchProduct } from "../../hooks/useFetchProduct";
import { useComputeProduct } from "../../hooks/useComputeProduct";
import Image from "next/image";

export const CardProduct = ({ variantId, defaultProductId, childCatId, childCatLabel }) => {
  const { allAttributes, defaultProduct, category, productAttributes, isAllSuccess, allValues, isVariant } = useFetchProduct(variantId, defaultProductId, childCatId);
  const { product, isSuccess: productSuccess } = useComputeProduct(allAttributes, productAttributes, allValues, category, defaultProduct, isAllSuccess, variantId, isVariant);
  const { facePicture: facePicture, isSuccess: pictureSucceed, isError: isPictureError } = usePicture(product.nomenclature?.simple, true); //true for miniature
  return (
    <>
      {productSuccess ? (
        <CardWrap>
          <Link href={{ pathname: "/shop/product", query: { display: 0, childCat: childCatId, vid: variantId, dpid: defaultProduct.id } }}>
            {!isPictureError ? pictureSucceed ? <Image width={360} height={540} style={{objectFit: "contain"}}  src={`data:image/png;base64,${facePicture}`} /> : <i className="fas fa-spinner fa-spin"></i> : "Aperçu non disponible"}
            <span className="shop_product_title ft2 text-nowrap ">{product.nomenclature.simple}</span>
            <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCatLabel.replace(/[0-9]{1}\s-\s*/gm, "")}</span>
            <span className="shop_product_price ft4  text-nowrap ">{product.prices ? product.prices.price + " €" : "Prix non disponible"} </span>
          </Link>
        </CardWrap>
      ) : null}
    </>
  );
};
