import { useEffect, useState } from "react";
import { itemsObject } from "./Components/ItemsObject";
import { Header } from "./Sections/Header";

export const Catalogue = () => {
  const [checkedItems, setCheckedItems] = useState({
    cannondale: false,
    canyon: false,
    specialized: false,
  });

  const [MountainRoad, setMountainRoad] = useState("all");

  const [displayItems, setDisplayItems] = useState({});

  const checkMountainRoad = () => {
    console.log("checkMountainRoad");
    setDisplayItems(itemsObject);
  };

  useEffect(() => {
    console.log("checkedItems", checkedItems)
    if (
      checkedItems["cannondale"] === false &&
      checkedItems["canyon"] === false &&
      checkedItems["specialized"] === false
    ) {
      checkMountainRoad();
    } else
    {
      Object.keys(checkedItems).forEach((item) => {
        if (checkedItems[item]) {
          setDisplayItems((prev) => {
            return { ...prev, item: itemsObject[item] };
          });
        }
      });
    }
  }, [checkedItems]);

  useEffect(() => {
    checkMountainRoad();
  }, [MountainRoad]);

  const displayBrand = (event) => {
    if (event.target.checked) {
      console.log("✅ Checkbox is checked", event);
      setCheckedItems((prev) => {
        return {...prev, [event.target.className] : true}
      })
    } else {
      console.log("⛔️ Checkbox is NOT checked");
      setCheckedItems((prev) => {
        return {...prev, [event.target.className] : false}
      })
    }
  }

  const displayTerrain = (event) => {
    setMountainRoad([event.target.className]);
  };
 

  // useEffect(() => {
  //   console.log(displayItems);
  // }, [displayItems]);

  return (
    <div>
      <Header section="Catalogue" />
      <label className="cannondale">
        Cannondale<input type="checkbox" className="cannondale" onChange={displayBrand}></input>
      </label>
      <label className="canyon">
        Canyon<input type="checkbox" className="canyon" onChange={displayBrand}></input>
      </label>
      <label className="specialized">
        Specialized<input type="checkbox" className="specialized" onChange={displayBrand}></input>
      </label>
      <div className="radioButtons">
        <label className="Mountain">
          Mountain
          <input type="radio" name="type" className="mountain" onChange={displayTerrain}></input>
        </label>
        <label className="Road">
          Road<input type="radio" name="type" className="road" onChange={displayTerrain}></input>
        </label>
        <label className="All">
          All<input type="radio" name="type" className="all" onChange={displayTerrain}></input>
        </label>
      </div>
    </div>
  );
};
