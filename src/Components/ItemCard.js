export const ItemCard = ({
  imageURL,
  price,
  productName,
  updateCart,
  terrain,
  brand,
  id,
}) => {
  //console.log(updateCart);
  return (
    <div>
      <h4 className="itemTitle">{productName}</h4>
      <img className="itemImage" src={imageURL} alt="Item" />
      <p className="itemPrice">{price}</p>
      <button
        className="addItemButton"
        type="button"
        onClick={(e) => updateCart(e)}
        data-brand={brand}
        data-terrain={terrain}
        data-id={id}
      >
        Add to Cart
      </button>
    </div>
  );
};
