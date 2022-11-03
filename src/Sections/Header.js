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
        <NavigationButton page="/" pageName="Home" />
        <NavigationButton page="/catalogue" pageName="Catalogue" />
        <NavigationButton page="/profile" pageName="Profile" />
        <ShoppingCartSymbol
          page="/shopping%20cart"
          pageName="Shopping Cart"
          cartCount={cartCount}
        />
      </div>
    </div>
  );
};
