import { Link } from "react-router-dom";
import cart from "../WebsiteImages/pngegg.png"

export const ShoppingCartSymbol = ({ cartCount, page, pageName }) => {
  return (
    <Link to={page} className="linkToCart">
      <label className="cartLabel">
        {cartCount}
        <img className="cartImage" alt="cartImage" src={cart}></img>
      </label>
    </Link>
  );
};
