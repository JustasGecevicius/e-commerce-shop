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
    console.log(e.target.value);
    setCart((prev) => {
      console.log(prev[e.target.id]);
      return {
        ...prev,
        [e.target.id]: { ...prev[e.target.id], count: e.target.value },
      };
    });
  };

  useEffect(() => {
    console.log(cart);
    let newCartCount = 0;
    Object.keys(cart).forEach((item) => {
      newCartCount += +cart[item]["count"];
    });
    setCartCount(newCartCount);
  }, [cart]);


  const removeItem = (e) => {
    console.log(e);
    setCart((prev) => {
      let zeba = {...prev};
        if(Object.keys(zeba).length===1){
          console.log("length===1")
          zeba = {};
          return zeba
        }
        else{
            delete zeba[e.target.className];
       return zeba;
        }


    })
  }

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
          <button className={item} onClick={removeItem}>Remove item</button>
        </div>
      </div>
    </div>
  );
};
