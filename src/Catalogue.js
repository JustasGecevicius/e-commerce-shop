/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ItemCard } from "./Components/ItemCard";
import { itemsObject } from "./Components/ItemsObject";
import { BikeSelection } from "./Sections/BikeSelection";
import { Header } from "./Sections/Header";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { ClipLoader } from "react-spinners";

export const Catalogue = ({
  cart,
  setCart,
  cartCount,
  setCartCount,
  MountainRoadAll,
  setMountainRoadAll,
  app,
}) => {
  const [imagesObject, setimagesObject] = useState({});
  const [checkedBrands, setCheckedItems] = useState({
    cannondale: false,
    canyon: false,
    specialized: false,
  });
  const [brandsArray, setBrandsArray] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    let displayItemsHolder = [];
    if (Object.keys(imagesObject).length !== 0) {

      const allDisplay = () => {
        brandsArray.forEach((brand) => {
          Object.keys(itemsObject[brand]).forEach((terrain) => {
            // eslint-disable-next-line array-callback-return
            Object.keys(itemsObject[brand][terrain]).map((bike, index) => {
              displayItemsHolder.push({
                ...itemsObject[brand][terrain][bike],
                id: bike,
                brand: brand,
                terrain: terrain,
                imageURL: imagesObject[brand][terrain][index],
              });
            });
          });
        });
        setDisplayItems(displayItemsHolder);
      };

      const typeDisplay = () => {
        brandsArray.forEach((brand) => {
          // eslint-disable-next-line array-callback-return
          Object.keys(itemsObject[brand][MountainRoadAll]).map(
            (bike, index) => {
              displayItemsHolder.push({
                ...itemsObject[brand][MountainRoadAll][bike],
                id: bike,
                brand: brand,
                terrain: MountainRoadAll,
                imageURL: imagesObject[brand][MountainRoadAll][index],
              });
            }
          );
        });
        setDisplayItems(displayItemsHolder);
      };

      MountainRoadAll === "all" ? allDisplay() : typeDisplay();
    }
  }, [brandsArray, MountainRoadAll]);

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

   useEffect(() => {
    //console.log(mainImagesObject);
   }, [mainImagesObject])

  useEffect(() => {
    let displayBrandsArray = [];
    if (Object.keys(imagesObject).length !== 0) {
      if (
        checkedBrands["cannondale"] === false &&
        checkedBrands["canyon"] === false &&
        checkedBrands["specialized"] === false
      ) {
        displayBrandsArray = ["cannondale", "canyon", "specialized"];
      } else {
        Object.keys(checkedBrands).forEach((item) => {
          if (checkedBrands[item]) {
            displayBrandsArray.push(item);
          }
        });
      }
      setBrandsArray(displayBrandsArray);
    }
  }, [checkedBrands, imagesObject]);

  const displayBrand = (event) => {
    if (event.target.checked) {
      setCheckedItems((prev) => {
        return { ...prev, [event.target.classList[0]]: true };
      });
    } else {
      setCheckedItems((prev) => {
        return { ...prev, [event.target.classList[0]]: false };
      });
    }
  };

  const displayTerrain = (event) => {
    setMountainRoadAll(event.target.classList[0]);
  };

  const BrandsArray = ["cannondale", "canyon", "specialized"];

  const fetchImages = async () => {
    const allImages = BrandsArray.map(async (elem) => {
      const storage = await getStorage(app);
      const imagesRef = await ref(storage, elem);
      const mountainRef = await ref(imagesRef, "mountain");
      const roadRef = await ref(imagesRef, "road");

      const imagesListMountain = await listAll(mountainRef);
      const imagesListRoad = await listAll(roadRef);
      const roadPromises = Object.keys(imagesListRoad["items"]).map(
        (imageRef) => getDownloadURL(imagesListRoad["items"][imageRef])
      );
      const mountainPromises = Object.keys(imagesListMountain["items"]).map(
        (imageRef) => getDownloadURL(imagesListMountain["items"][imageRef])
      );
      const promises = [...mountainPromises, "", ...roadPromises];
      return Promise.all(promises);
    });

    const resolvedPromises = await Promise.all(allImages);
    const resolvedObject = resolvedPromises.reduce(
      (acc, curr, index) => ({ ...acc, [BrandsArray[index]]: curr }),
      {}
    );
    Object.keys(resolvedObject).forEach((elem) => {
      let index = resolvedObject[elem].indexOf("");
      let mountainArray = resolvedObject[elem].slice(0, index);
      let roadArray = resolvedObject[elem].slice(index + 1);

      resolvedObject[elem] = { Mountain: mountainArray, Road: roadArray };
    });
    setimagesObject(resolvedObject);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const updateCart = (e) => {
    const id = e["target"]["dataset"]["id"];
    const brand = e["target"]["dataset"]["brand"];
    const terrain = e["target"]["dataset"]["terrain"];
    const imgURL = e["target"]["dataset"]["imageurl"];

    if (Object.keys(cart).includes(id)) {
      setCart((prev) => {
        const newCount = prev[id]["count"] + 1;
        return { ...prev, [id]: { ...prev[id], count: newCount } };
      });
    } else {
      setCart((prev) => {
        return {
          ...prev,
          [id]: {
            ...itemsObject[brand][terrain][id],
            count: 1,
            imageURL: imgURL,
          },
        };
      });
    }
  };

  useEffect(() => {
    let newCartCount = 0;
    Object.keys(cart).forEach((item) => {
      newCartCount += +cart[item]["count"];
    });
    setCartCount(newCartCount);
  }, [cart]);

  return ( Object.keys(mainImagesObject).length !== 0 ? (<div className="catalogue">
  <Header cartCount={cartCount} logo={mainImagesObject["logo.png"]} cartLogo={mainImagesObject["cartLogo.png"]}/>
  <div className="catalogueDiv">
    <div className="picturesDiv">
      <div className="side1Div" style={{backgroundImage: `url(${mainImagesObject["roadside.jpg"]})`}}></div>
      <div className="side2Div" style={{backgroundImage: `url(${mainImagesObject["mountainside.jpg"]})`}}></div>
      <h2>Explore our Offerings!</h2>
    </div>
    <div className="thingsDiv">
      <BikeSelection
        displayTerrain={displayTerrain}
        displayBrand={displayBrand}
        MountainRoadAll={MountainRoadAll}
        mainImages={mainImagesObject}
      />
      <h2> Available Options</h2>
      {displayItems ? (<div className="allItems">
        {displayItems.map((item, index) => {
          return <ItemCard key={index} {...item} updateCart={updateCart} />;
        })}
      </div>) : (<div className="loaderDiv"><ClipLoader color="#000000" /></div>)}
      
    </div>
  </div>
</div>) : (<div className="loaderDiv"><ClipLoader color="#000000" /></div>)
    
  );
};
