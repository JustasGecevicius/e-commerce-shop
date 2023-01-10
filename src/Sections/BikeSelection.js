import React from "react";
import { ItemSelector } from "../Components/ItemSelector";
import { RadioItemSelector } from "../Components/RadioItemSelector";

export const BikeSelection = ({ displayBrand, displayTerrain, MountainRoadAll, mainImages }) => {


  return (
    <div className="bikeChoice">
      <div className="brandChoice choice">
        <h2> Choose a brand!</h2>
        <div className="checkBoxWrapper">
          <ItemSelector
            type="checkbox"
            className="cannondale"
            onChange={displayBrand}
            src={mainImages["cannondaleLogo.png"]}
          />
          <ItemSelector
            type="checkbox"
            className="canyon"
            onChange={displayBrand}
            src={mainImages["canyonLogo.png"]}
          />
          <ItemSelector
            type="checkbox"
            className="specialized"
            onChange={displayBrand}
            src={mainImages["specializedLogo.png"]}
          />
        </div>
      </div>
      <div className="terrainChoice choice">
        <h2>Choose a type!</h2>
        <div className="radioButtonWrapper">

          
          <RadioItemSelector
            type="radio"
            className="Mountain"
            onChange={displayTerrain}
            src={mainImages["mountainIcon.png"]}
            MountainRoadAll={MountainRoadAll}
          />
          <RadioItemSelector
            type="radio"
            className="Road"
            onChange={displayTerrain}
            src={mainImages["roadIcon.png"]}
            MountainRoadAll={MountainRoadAll}
          />
          <RadioItemSelector
            type="radio"
            className="all"
            onChange={displayTerrain}
            src={mainImages["bothIcon.png"]}
            MountainRoadAll={MountainRoadAll}
          />
        </div>
      </div>
    </div>
  );
};
