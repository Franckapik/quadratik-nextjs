import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CSVByFilename } from "../components/dolibarrApi/fetch";

export const useFrequencies = (nomenclature, dimensions) => {
  const [frequencies, setFrequencies] = useState(false);
  const { data: chart, isSuccess: chartSucceed } = useQuery(["chart", { name: nomenclature?.performance }], () => CSVByFilename("Frequencies/" + nomenclature.performance + ".csv"), {
    staleTime: Infinity,
    enabled: !!nomenclature?.performance && nomenclature?.performance != undefined && dimensions !== undefined,
  });

  useEffect(() => {
    if (chartSucceed && dimensions.N !== undefined) {
      //diffusors
      const labels = chart.map((a, i) => parseFloat(a[0]?.replace(/,/g, "."))).filter(a => !Number.isNaN(a));
      const diffusion =  chart.map((a, i) => parseFloat(a[1]?.replace(/,/g, "."))).filter(a => !Number.isNaN(a));
      const scattering =  chart.map((a, i) => parseFloat(a[2]?.replace(/,/g, "."))).filter(a => !Number.isNaN(a));
      setFrequencies({labels, diffusion, scattering});
    }
    if (chartSucceed && dimensions.F !== undefined) {
      //absorbers

      const labels = chart.map((a, i) => parseFloat(a[0]?.replace(/,/g, "."))).filter(a => !Number.isNaN(a));
      const absorption =  chart.map((a, i) => parseFloat(a[1]?.replace(/,/g, "."))).filter(a => !Number.isNaN(a));
      const fmin = labels[absorption.findIndex(a => a > 0.5)];
      const fmax = labels[absorption.findIndex(a => a > 0.90)];
      setFrequencies({labels, absorption, fmin, fmax});
    }
  }, [chartSucceed]);

  return {frequencies : frequencies, isSuccess : chartSucceed};
};
