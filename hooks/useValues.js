import { useQueries } from "react-query";
import { valuesFetchByAttributesId } from "../components/dolibarrApi/fetch";
import { useEffect, useState } from "react";

export const useValues = (attributes) => {
  const [data, setData] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const allValues = useQueries(
    attributes?.map((a) => {
      return {
        queryKey: ["values", a.id],
        queryFn: () => valuesFetchByAttributesId(a.id),
      };
    }) ?? []
  );

  const isSuccess2 = allValues.every((result) => result.isSuccess);
  const valuesData = isSuccess2 && allValues.map((a) => a.data.map((b) => ({ v_id: b.id, v_ref: b.ref, v_3d: b.value?.split(",")[0], v_label: b.value?.split(",")[1], v_operator: b.value?.split(",")[3], v_factor: b.value?.split(",")[2] }))).flat();

  useEffect(() => {
    if (isSuccess2 && attributes) {
      setSuccess(isSuccess2);
      setData(valuesData);
    }
  }, [isSuccess2, attributes]);

  return { data: data, isSuccess: isSuccess };
};
