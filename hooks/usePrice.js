import { useEffect, useState } from "react";
export const usePrice = (product, productParent) => {
    const [basePrice, setBasePrice] = useState(false);
    const [totalPrice, setTotaPrice] = useState(false);

useEffect(() => {
  if (productParent) {
    setBasePrice(parseFloat(productParent.price))
  }
}, [productParent])

useEffect(() => {
    if (basePrice) {
         const a = Object.values(product).reduce((total, item) => {
          if(item.operation) {
            switch (item.operation) {
              case "multiplication":
                total += (item.attribute_price - 1) * basePrice;
                break;
    
              case "addition":
                total += item.attribute_price * basePrice;
                break;
    
              default:
                console.log("Strategie de calcul de prix non repertoriée");
            }
          }
              
              return total;
            
          }, basePrice);
          setTotaPrice(a.toFixed(2)); 
    }
   
}, [basePrice, product])

return [basePrice, totalPrice] ;

}