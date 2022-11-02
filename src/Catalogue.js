import { useEffect, useState } from "react";
import { ItemCard } from "./Components/ItemCard";
import { itemsObject } from "./Components/ItemsObject";
import { BikeSelection } from "./Sections/BikeSelection";
import { Header } from "./Sections/Header";

export const Catalogue = () => {
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
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});
  const [MountainRoadAll, setMountainRoadAll] = useState("all");
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
      console.log("✅ Checkbox is checked", event);
      setCheckedItems((prev) => {
        return { ...prev, [event.target.className]: true };
      });
    } else {
      console.log("⛔️ Checkbox is NOT checked");
      setCheckedItems((prev) => {
        return { ...prev, [event.target.className]: false };
      });
    }
  };

  const displayTerrain = (event) => {
    setMountainRoadAll(event.target.className);
  };

  const updateCart = (e) => {
    const id = e["target"]["dataset"]["id"];
    const brand = e["target"]["dataset"]["brand"];
    const terrain = e["target"]["dataset"]["terrain"];

    if (Object.keys(cart).includes(id)) {
      console.log("cia");
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
    console.log(displayItems);
  }, [displayItems]);

  useEffect(() => {
    console.log(cartCount);
  }, [cartCount]);

  useEffect(() => {
    console.log(cart);
    let newCartCount = 0;
    Object.keys(cart).forEach((item) => {
      newCartCount += cart[item]["count"];
    });
    setCartCount(newCartCount);
    //console.log(newCartCount);
  }, [cart]);

  return (
    <div>
      <Header section="Catalogue" />
      <BikeSelection
        displayTerrain={displayTerrain}
        displayBrand={displayBrand}
      />
      <p>Items in Cart: {cartCount}</p>
      <div className="allItems">
        {displayItems.map((item, index) => {
          return <ItemCard key={index} {...item} updateCart={updateCart} />;
        })}
      </div>
    </div>
  );
};
