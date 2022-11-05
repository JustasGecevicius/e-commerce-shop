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
    <div className="item">
      <img className="itemImage" src={imageURL} alt="Item" />
      <h3 className="itemTitle">{productName}</h3>
      <p className="itemPrice"> {price}{String.fromCharCode(36)}</p>
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
