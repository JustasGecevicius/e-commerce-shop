import React from "react";

export const ShoppingCartItemCard = ({imageURL, price, productName, count}) => {
    
  return (<div className="shoppingCartItemCard">
    <img alt="bike" src={imageURL} className="shoppingCartItemImage"/>
    <div className="shoppingCartItemTextDiv">
      <h4>{productName}</h4>
      <p>{price}</p>
      <p>{count}</p>
    </div>
  </div>);
};
