export const ItemCard = ({itemName, imgSource, itemPrice}, handleAddItem) => {
    return(
        <div>
            <h4>{itemName}</h4>
            <img src={imgSource} alt="Item"/>
            <p>{itemPrice}</p>
            <button type="button" onClick={handleAddItem()}>Add to Cart</button>            
        </div>
    )
}