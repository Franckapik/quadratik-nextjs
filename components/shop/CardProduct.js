import Link from "next/link";
import React from "react";
import { useFetchPicture } from "../../hooks/useFetchPicture";
import { useNomenclature } from "../../hooks/useNomenclature";
import { usePrice } from "../../hooks/usePrice";
import { CardWrap } from "./CardWrap";

export const CardProduct = ({ variant, childCat, attributes, defaultProduct }) => {
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
};
