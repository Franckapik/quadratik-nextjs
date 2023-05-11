import { useEffect, useState } from "react";
import { listCategories } from "../components/dolibarrApi/fetch";

export const useFetchCategories = (filter) => {
  const [categories, setCategories] = useState([]);

  //get all categories
  useEffect(() => {
    listCategories()
      .get()
      .then((response) => {
        function compare(a, b) {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        }

        setCategories(response.data.sort(compare).filter(filter));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

return categories;    
}