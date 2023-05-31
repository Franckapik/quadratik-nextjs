import { useQuery } from "react-query";
import { variantFetchByParentId } from "../components/dolibarrApi/fetch";

export const useVariant = (defaultProductId, variantId) =>
  useQuery({
    queryKey: ["variants", { defaultProductId: defaultProductId }],
    queryFn: () => variantFetchByParentId(defaultProductId),
    select: (data) => data.find((v) => v.fk_product_child === variantId),
    staleTime: Infinity,
    enabled: defaultProductId !== undefined && defaultProductId?.length !== 0,
  });