/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

export const ShoppingCartItemCard = ({
  imageURL,
  price,
  productName,
  count,
  setCart,
  item,
  cart,
  setCartCount,
}) => {
  const cartItemNumberChange = (e) => {
    setCart((prev) => {
      return {
        ...prev,
        [e.target.id]: { ...prev[e.target.id], count: e.target.value },
      };
    });
  };

  useEffect(() => {
    let newCartCount = 0;
    Object.keys(cart).forEach((item) => {
      newCartCount += +cart[item]["count"];
    });
    setCartCount(newCartCount);
  }, [cart]);

  const removeItem = (e) => {
    setCart((prev) => {
      let cartItems = { ...prev };
      
      if (Object.keys(cartItems).length === 1) {
        cartItems = {};
        setCartCount(0);
        return {};
      } else {
        delete cartItems[e.target.className];
        return cartItems;
      }
    });
  };

  return (
    <div className="shoppingCartItemCard">
      <img alt="bike" src={imageURL} className="shoppingCartItemImage" />
      <div className="shoppingCartItemTextDiv">
        <div className="shoppingCartItemWrapper">
          <h4>{productName}</h4>
          <p>
            {price}
            {String.fromCharCode(36)}
          </p>
        </div>
        <div className="amountWrapper">
          <p>
            Amount:{" "}
            <input
              id={item}
              value={count}
              min="1"
              type="number"
              className="cartItemNumber"
              onChange={cartItemNumberChange}
            ></input>
          </p>
          <button className={item} onClick={removeItem}>
            Remove item
          </button>
        </div>
      </div>
    </div>
  );
};
