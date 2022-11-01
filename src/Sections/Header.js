export const Header = ({section}) => {
    return (
      <div className="Catalogue">
        <a href="http://localhost:3000/" className="buttonWrapper">
          <button type="button">Home Page</button>
        </a>
        <a href="http://localhost:3000/profile" className="buttonWrapper">
          <button type="button">Profile</button>
        </a>
        <a href="http://localhost:3000/catalogue" className="buttonWrapper">
          <button type="button"> Catalogue</button>
        </a>
        <a href="http://localhost:3000/cart" className="buttonWrapper">
          <button type="button">Shopping Cart</button>
        </a>
        <h1>{section}</h1>
      </div>
    )
  };