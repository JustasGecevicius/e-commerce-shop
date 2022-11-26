import { useEffect, useState } from "react";
import { ItemCard } from "./Components/ItemCard";
import { itemsObject } from "./Components/ItemsObject";
import { BikeSelection } from "./Sections/BikeSelection";
import { Header } from "./Sections/Header";
//import { getStorage, ref, listAll, getDownloadURL} from "firebase/storage";

export const Catalogue = ({cart, setCart, cartCount, setCartCount, MountainRoadAll, setMountainRoadAll, app}) => {
 // const [imagesObject, setimagesObject] = useState({});

  require.context(
    "/public/Images/canyon/Mountain",
    false,
    /\.(png|jpe?g|svg)$/
  );
  require.context("/public/Images/canyon/Road", false, /\.(png|jpe?g|svg)$/);
  require.context(
    "/public/Images/cannondale/Mountain",
    false,
    /\.(png|jpe?g|svg)$/
  );
  require.context(
    "/public/Images/cannondale/Road",
    false,
    /\.(png|jpe?g|svg)$/
  );
  require.context(
    "/public/Images/specialized/Mountain",
    false,
    /\.(png|jpe?g|svg)$/
  );
  require.context(
    "/public/Images/specialized/Road",
    false,
    /\.(png|jpe?g|svg)$/
  );

  const [checkedBrands, setCheckedItems] = useState({
    cannondale: false,
    canyon: false,
    specialized: false,
  });
  const [brandsArray, setBrandsArray] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    let displayItemsHolder = [];
    if (MountainRoadAll === "all") {
      brandsArray.forEach((brand) => {
        Object.keys(itemsObject[brand]).forEach((terrain) => {
          Object.keys(itemsObject[brand][terrain]).forEach((bike) => {
            displayItemsHolder.push({
              ...itemsObject[brand][terrain][bike],
              id: bike,
              brand: brand,
              terrain: terrain,
            });
          });
        });
      });
      setDisplayItems(displayItemsHolder);
    } else if (MountainRoadAll === "mountain") {
      brandsArray.forEach((brand) => {
        Object.keys(itemsObject[brand]["Mountain"]).forEach((bike) => {
          displayItemsHolder.push({
            ...itemsObject[brand]["Mountain"][bike],
            id: bike,
            brand: brand,
            terrain: "Mountain",
          });
        });
      });
      setDisplayItems(displayItemsHolder);
    } else {
      brandsArray.forEach((brand) => {
        Object.keys(itemsObject[brand]["Road"]).forEach((bike) => {
          displayItemsHolder.push({
            ...itemsObject[brand]["Road"][bike],
            id: bike,
            brand: brand,
            terrain: "Road",
          });
        });
      });
      setDisplayItems(displayItemsHolder);
    }
  }, [brandsArray, MountainRoadAll]);

  useEffect(() => {
    let displayBrandsArray = [];
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
  }, [checkedBrands]);

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

  // const ProjectsArray = [
  //   "cannondale",
  //   "canyon",
  //   "specialized"  
  // ];

  // const fetchImages = async () => {
  //   const allImages = ProjectsArray.map(async (elem) => {
  //     const storage = await getStorage(app);
  //     const imagesRef = await ref(storage, elem);
  //     const mountainRef = await ref(imagesRef, "mountain");
  //     const roadRef = await ref(imagesRef, "road");

  //     const imagesListMountain = await listAll(mountainRef);
  //     const imagesListRoad = await listAll(roadRef);
  //     //console.log(imagesListMountain, "mountainRef");
  //     //console.log(imagesListRoad, "roadRef");
  //     const roadPromises = Object.keys(imagesListRoad["items"]).map((imageRef) =>
  //       getDownloadURL(imagesListRoad["items"][imageRef])
  //   );
  //   //console.log(roadPromises, "roadPromises");
  //   const mountainPromises = Object.keys(imagesListMountain["items"]).map((imageRef) =>
  //       getDownloadURL(imagesListMountain["items"][imageRef])
  //   );
  //     //console.log(imagesRef);
  //     const promises = [...roadPromises,"", ...mountainPromises]; 
  //     console.log(promises, "promises");
  //     return Promise.all(promises);
  //   });

  //   const bybydejau = await Promise.all(allImages);
  //   console.log(bybydejau);
  //   const newBybyDejau = bybydejau.reduce(
  //     (acc, curr, index) => ({ ...acc, [ProjectsArray[index]]: curr }),
  //     {}
  //   );
  //   setimagesObject(newBybyDejau);
  // };

  // useEffect (() => {fetchImages()},[]);

  // useEffect (() => {console.log(imagesObject)},[imagesObject]);


  const updateCart = (e) => {
    const id = e["target"]["dataset"]["id"];
    const brand = e["target"]["dataset"]["brand"];
    const terrain = e["target"]["dataset"]["terrain"];

    if (Object.keys(cart).includes(id)) {
      setCart((prev) => {
        const newCount = prev[id]["count"] + 1;
        return { ...prev, [id]: { ...prev[id], count: newCount } };
      });
    } else {
      setCart((prev) => {
        return {
          ...prev,
          [id]: { ...itemsObject[brand][terrain][id], count: 1 },
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

  return (
    <div className="catalogue">
      <Header cartCount={cartCount}/>
      <div className="catalogueDiv">
        <div className="picturesDiv">
          <div className="side1Div"></div>
          <div className="side2Div"></div>
          <h2>Explore our Offerings!</h2>
        </div>
        <div className="thingsDiv">
          <BikeSelection
            displayTerrain={displayTerrain}
            displayBrand={displayBrand}
            MountainRoadAll={MountainRoadAll}
          />
         <h2> Available Options</h2>
          <div className="allItems">
            {displayItems.map((item, index) => {
              return <ItemCard key={index} {...item} updateCart={updateCart} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
