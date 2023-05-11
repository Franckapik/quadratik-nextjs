import { useEffect, useState } from "react";
import { variantFetchByParentId } from "../components/dolibarrApi/fetch";

export const useFetchVariant = (defaultProduct, filter) => {

    const [variants, setVariants] = useState(false);

    useEffect(() => {
        if (defaultProduct) {
          variantFetchByParentId(defaultProduct)
            .get()
            .then((response) => {
              setVariants(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, [defaultProduct]);

return variants;    
}