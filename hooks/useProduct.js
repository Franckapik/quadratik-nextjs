import { useEffect, useState } from "react";

export const useProduct = (variantId, defaultProductId, childCatId) => {

    const [product, setProduct] = useState(false);

    useEffect(() => {

      }, [variantId]);

return {product : product, setProduct : setProduct};    
}