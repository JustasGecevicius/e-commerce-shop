import React, { useEffect } from "react";

export const ShoppingCartItemCard = ({imageURL, price, productName, count, setCart, item, cart, setCartCount}) => {

  const cartItemNumberChange = (e) => {
    console.log(e.target.value);
    setCart((prev) => {
      console.log(prev[e.target.id]);
      return(
        {...prev, [e.target.id] : {...prev[e.target.id], "count" : e.target.value}}
      )
    })
  }

  useEffect(() => {
    //console.log(cart);
    let newCartCount = 0;
    Object.keys(cart).forEach((item) => {
     // console.log(typeof cart[item]["count"], typeof newCartCount)
      newCartCount += +cart[item]["count"];
      //console.log(typeof newCartCount);
    });
   // console.log(newCartCount);
    setCartCount(newCartCount);
    //console.log(newCartCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  // useEffect(() => {
  //   console.log(cartNumber)
  // }, [cartNumber])


    
  return (<div className="shoppingCartItemCard">
    <img alt="bike" src={imageURL} className="shoppingCartItemImage"/>
    <div className="shoppingCartItemTextDiv">
      <div className="shoppingCartItemWrapper">
        <h4>{productName}</h4>
        <p>{price}{String.fromCharCode(36)}</p>
      </div>      
      <p>Amount: <input id={item} value={count} min="1" type="number" className="cartItemNumber" onChange={cartItemNumberChange}></input></p>
    </div>
  </div>);
};
