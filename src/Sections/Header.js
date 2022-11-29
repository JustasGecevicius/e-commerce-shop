import { NavigationButton } from "../Components/NavigationButton";
import { ShoppingCartSymbol } from "../Components/ShoppingCartSymbol";
import image from "../WebsiteImages/bike-logo-black-and-white.png";

export const Header = ({ cartCount }) => {
  return (
    <div className="header">
      <div className="websiteName">
        <img className="logoImage" alt="logo" src={image}></img>
      </div>
      <div className="navButtons">
        <NavigationButton page="/e-commerce-shop" pageName="Home" />
        <NavigationButton page="/e-commerce-shop/catalogue" pageName="Catalogue" />
        <NavigationButton page="/e-commerce-shop/profile" pageName="Profile" />
        <ShoppingCartSymbol
          page="/e-commerce-shop/shopping%20cart"
          pageName="Shopping Cart"
          cartCount={cartCount}
          className="cartbutton"
        />
      </div>
    </div>
  );
};
