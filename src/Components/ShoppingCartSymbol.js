import { Link } from "react-router-dom";

export const ShoppingCartSymbol = ({ cartCount, page, pageName, cartLogo }) => {
  return (
    <Link to={page} className="linkToCart">
      <label className="cartLabel">
        {cartCount}
        <img className="cartImage" alt="cartImage" src={cartLogo}></img>
      </label>
    </Link>
  );
};
