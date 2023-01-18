/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { ShoppingCartItemCard } from "./Components/ShoppingCartItemCard";
import { Header } from "./Sections/Header";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const ShoppingCart = ({
  cart,
  setCart,
  cartCount,
  setCartCount,
  cartItemNumberChange,
}) => {


  const storage = getStorage();

  // Create a reference under which you want to list
  const listRefference = ref(storage, 'Catalogue/Initial');

  const [mainImagesObject, setMainImagesObject] = useState({});

  useEffect(() => {
    //console.log("useEffect");
    const fetchList = async () => {
      const list = await listAll(listRefference);
      const metadataPromise = [];
      const itemLinkPromise = [];
      //console.log(list, "list");
      list.items.forEach((itemRef) => {
        const metadata = getMetadata(itemRef);
        const item = getDownloadURL(itemRef);
        metadataPromise.push(metadata);
        itemLinkPromise.push(item);      
      });
      const metadataPromises = Promise.all([...metadataPromise]);
      const itemPromises = Promise.all([...itemLinkPromise]);
      //console.log(metadataPromises, itemPromises ,"all Promises");
      const allPromises = await Promise.all([metadataPromises, itemPromises]);
      //console.log(allPromises);
  
      // console.log(resolvedPromises[0]);
      // // eslint-disable-next-line array-callback-return
      allPromises[0].map((elem, index) => {
        setMainImagesObject((prev) => ({
          ...prev, [elem["name"]]: allPromises[1][index]
        }))
      })
      
    }
  
    fetchList()
    .catch(console.error);  
   }, [])

  return (Object.keys(mainImagesObject).length !== 0 ? (cartCount === 0 ? (
    <div className="wrapper">
      <Header cartCount={cartCount} logo={mainImagesObject["logo.png"]} cartLogo={mainImagesObject["cartLogo.png"]}/>
      <div className="selectedItems">
        <h3> Sorry, there are no items in the Shopping cart</h3>
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <Header cartCount={cartCount} logo={mainImagesObject["logo.png"]} cartLogo={mainImagesObject["cartLogo.png"]}/>
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
  )) : (<div className="loaderDiv"><ClipLoader color="#000000" /></div>))
  
  
};
