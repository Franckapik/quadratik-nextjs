import { useQuery } from "react-query";
import { attributesAllFetch } from "../components/dolibarrApi/fetch";
import { useEffect, useState } from "react";

export const useValuesSelected = (attributes, values, key, value) => {
  const [data, setData] = useState(false);

  const { data: allAttributes, isSuccess: allAttributesSucceed } = useQuery(
    ["attributes"],
    () =>
      attributesAllFetch()
        .get()
        .then((response) => response.data),
    { staleTime: Infinity }
  );

  useEffect(() => {
    if (attributes?.length && allAttributesSucceed && values && key && value) {
      console.log(values);
      const valuesSelected = attributes.reduce((acc, cur, i, a) => ({ ...acc, [allAttributes.filter((a) => a.id == cur.id)[0][key]]: values.filter((a) => a.v_id == cur.fk_prod_attr_val)[0][value] }), {});
      setData(valuesSelected);
    }
  }, [attributes, values, allAttributesSucceed]);

  return { data: data };
};
