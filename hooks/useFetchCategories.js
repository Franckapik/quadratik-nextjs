import { useEffect, useState } from "react";
import { listCategories } from "../components/dolibarrApi/fetch";

export const useFetchCategories = (filter) => {
  const [categories, setCategories] = useState([]);

  //get all categories
  useEffect(() => {
    listCategories(filter);
  }, []);

  return categories;
};
