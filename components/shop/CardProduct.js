import Link from "next/link";
import React from "react";
import { useFetchPicture } from "../../hooks/useFetchPicture";
import { useNomenclature } from "../../hooks/useNomenclature";
import { usePrice } from "../../hooks/usePrice";
import { CardWrap } from "./CardWrap";
import { documentByFilename } from "../dolibarrApi/fetch";
import { useQuery } from "react-query";
import { useProduct } from "../../hooks/useProduct";

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
  const { data: pictureOfVariant, isSuccess: pictureOfVariantSucceed } = useQuery(["pictureOfVariant", { variantId: variantId }], () => documentByFilename("Modeles/Miniature/" + "Woodik-710.png"), { staleTime: Infinity });
  const { data: variant, isSuccess: variantsSucceed } = useQuery({queryKey :["variants", { defaultProductId: defaultProductId }], select : data => data.find(v => v.fk_product_child === variantId)});
  const {product, setProduct} = useProduct(variantId, defaultProductId,childCatId);

  return (
    <CardWrap>
"coucou" - {variant?.id} - {variantId} - {defaultProductId} - cat {childCatId} - {childCatLabel}
      {pictureOfVariantSucceed ? <img src={`data:image/png;base64,${pictureOfVariant}`} /> : "Image non disponible"}
    </CardWrap>
  );
};
