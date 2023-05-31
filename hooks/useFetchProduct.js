import { useEffect, useState } from "react";
import { objectsInCategory } from "../components/dolibarrApi/fetch";

export const useFetchProduct = (categorie, index) => {
  const [products, setProducts] = useState(false);
  useEffect(() => {
    objectsInCategory(categorie.id, true)
      .then((response) => {
        if (index !== undefined) {
          setProducts(response.data[index]);
        } else {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categorie]);

  return products;
};
