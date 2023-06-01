import Link from "next/link";
import React from "react";
import { useFetchPicture } from "../../hooks/useFetchPicture";
import { useNomenclature } from "../../hooks/useNomenclature";
import { usePrice } from "../../hooks/usePrice";
import { CardWrap } from "./CardWrap";
import { documentByFilename } from "../dolibarrApi/fetch";
import { useQuery } from "react-query";
import { useProduct } from "../../hooks/useProduct";
import { useVariant } from "../../hooks/useVariant";

/* export const CardProduct = ({ variant, childCat, attributes, defaultProduct }) => {
  const nomenclature = useNomenclature(variant.valuesSelected, childCat.fk_parent, attributes);
  const price = usePrice(variant.valuesSelected, defaultProduct, attributes);
  const [miniature, error] = useFetchPicture(nomenclature, 'Miniature');

  return (
    <CardWrap>
      <Link href={{ pathname: "/shop/product", query: { Display: 0, TAG: childCat.fk_parent, childCat : childCat.id, ...variant.valuesSelected } }}>
        {!error && miniature ? <img src={`data:image/png;base64,${miniature}`} /> : "Image non disponible"}
        <span className="shop_product_title ft2 ">{nomenclature.simple}</span>
        <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCat.label}</span>
        <span className="shop_product_price ft4 text-uppercase text-nowrap ">{Math.round(price[0])} €</span>
      </Link>
    </CardWrap>
  );
}; */

export const CardProduct = ({ variantId, defaultProductId, childCatId, childCatLabel }) => {
  const { data: variant, isSuccess: variantsSucceed } = useVariant(defaultProductId, variantId)
  const { product, setProduct } = useProduct(variantId, defaultProductId, childCatId);

  return (
    <CardWrap>
      "coucou" - {variant?.id} - {variantId} - {defaultProductId} - cat {childCatId} - {childCatLabel}
      {product.image ? <img src={`data:image/png;base64,${product.image}`} /> : "Image non disponible"}
      <span className="shop_product_title ft2 ">{"Woodik-7"}</span>
        <span className="shop_product_collection ft6 text-uppercase text-nowrap ">{childCatLabel}</span>
        <span className="shop_product_price ft4  text-nowrap ">{product.price ? product.price + " €" : "Prix non disponible" } </span>
    </CardWrap>
  );
};
