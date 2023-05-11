import { useEffect, useState } from "react";

export const useFetchVariant = (defaultProduct) => {

    const [variants, setVariants] = useState(false);


    useEffect(() => {
        if (defaultProduct) {
          variantFetchByParentId(defaultProduct.id)
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