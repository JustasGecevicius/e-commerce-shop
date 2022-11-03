import { ShoppingCartItemCard } from "./Components/ShoppingCartItemCard";
import { Header } from "./Sections/Header"




export const ShoppingCart = ({cart, setCart, cartCount, setCartCount}) => {
  return (
    <div className="wrapper">
      <Header cartCount={cartCount}/>
      <p>Cart Count : {cartCount}</p>
      <div className="selectedItems">
        {Object.keys(cart).map((item, index) => {


          return (<ShoppingCartItemCard {...cart[item]}/>);
        })}
      </div>
    </div>
    
  );
};
