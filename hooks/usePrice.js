import { useEffect, useState } from "react";

export const usePrice = (prices) => {
    const [basePrice, setBasePrice] = useState(false);
    const [totalPrice, setTotaPrice] = useState(false);

useEffect(() => {
    if(prices && prices.length) {
      const a = prices.reduce((tot, i) => {
        if (i.attribute_ref === "N" || i.attribute_ref === "P") {
            tot *= i.value_3D;
            return parseInt(tot);
        } else {
            return parseInt(tot);
        }
    }, 1);
    setBasePrice(a);  
    }
    
}, [prices])

useEffect(() => {
    if (prices && prices.length && basePrice) {
        console.log(prices);
        const a = prices.reduce((total, item) => {
            if (item.notInPrice) {
              return total;
            } else {
              switch (item.operation) {
                case "multiplication":
                  total += (item.price_value - 1) * basePrice;
                  break;
      
                case "addition":
                  total += item.price_value * basePrice;
                  break;
      
                default:
                  console.log("Strategie de calcul de prix non repertoriée");
              }
              return total;
            }
          }, basePrice);
          setTotaPrice(a);
    }
   
}, [basePrice, prices])

return [basePrice, totalPrice] ;

}