import { ShoppingCartItemCard } from "./Components/ShoppingCartItemCard";
import { Header } from "./Sections/Header";

export const ShoppingCart = ({
  cart,
  setCart,
  cartCount,
  setCartCount,
  cartItemNumberChange,
}) => {
  //console..log(cart)
  if (cartCount === 0) {
    return (
      <div className="wrapper">
        <Header cartCount={cartCount} />
        <div className="selectedItems">
          <h3> Sorry, there are no items in the Shopping cart</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <Header cartCount={cartCount} />
        <div className="selectedItems">
          {Object.keys(cart).map((item, index) => {
            return (
              <ShoppingCartItemCard
                key={index}
                cart={cart}
                {...cart[item]}
                setCart={setCart}
                cartItemNumberChange={cartItemNumberChange}
                item={item}
                setCartCount={setCartCount}
              />
            );
          })}
                  <button type="button" className="checkoutButton">
          Checkout!
        </button>
        </div>

      </div>
    );
  }
};
