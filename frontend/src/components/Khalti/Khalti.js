import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./KhaltiConfig";


export default function Khalti({orderDetails}) {
    const {order} = orderDetails

    config.productIdentity = order.orderItems[0].product;
    config.productName = order.orderItems[0].name;
   
    
    const checkout = new KhaltiCheckout(config);
 
 
  
  const buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };

  return (
    <div>
      <button
        onClick={() => checkout.show({ amount: Number(order.totalPrice) * 100 })}
        style={buttonStyles}
      >
        Pay Via Khalti
      </button>
    </div>
  );
}