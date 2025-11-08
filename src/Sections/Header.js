import { NavigationButton } from "../Components/NavigationButton";
import { ShoppingCartSymbol } from "../Components/ShoppingCartSymbol";

export const Header = ({ cartCount, logo, cartLogo }) => {
  return (
    <div className="header">
      <div className="websiteName">
        <img className="logoImage" alt="logo" src={logo}></img>
      </div>
      <div className="navButtons">
        {/* <NavigationButton page="/e-commerce-shop" pageName="Home" /> */}
        <NavigationButton page="/e-commerce-shop/catalogue" pageName="Catalogue" />
        <NavigationButton page="/e-commerce-shop/profile" pageName="Profile" />
        <ShoppingCartSymbol
          page="/e-commerce-shop/shopping%20cart"
          pageName="Shopping Cart"
          cartCount={cartCount}
          className="cartbutton"
          cartLogo={cartLogo}
        />
      </div>
    </div>
  );
};
