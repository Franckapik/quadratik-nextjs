import { useEffect, useState } from "react";
import { objectsInCategory } from "../components/dolibarrApi/fetch";

export const useFetchDefaultProduct = (categorie) => {
  const [defaultProduct, setDefaultProduct] = useState(false);
  useEffect(() => {
    objectsInCategory(categorie)
      .get()
      .then((response) => {
        var attributes = JSON.parse(response.data[0].note_private);
        setDefaultProduct({ ...response.data[0], attributes: attributes });
        console.log(attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categorie]);

  return defaultProduct;
};
