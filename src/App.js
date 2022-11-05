import { useState } from "react";
import "./css/App2.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import { Profile } from "./Profiles";
import { Catalogue } from "./Catalogue";
import { ShoppingCart } from "./ShoppingCart";
import ScrollToTop from "./ScrollToTop";

export const App = () => {
  const [cart, setCart] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [MountainRoadAll, setMountainRoadAll] = useState("all");

  const mountainCatalogue = () => {
    setMountainRoadAll("mountain");
  }

  const roadCatalogue = () => {
    setMountainRoadAll("road");
  }


  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        
        <Route path="/" element={<HomePage cartCount={cartCount} mountainCatalogue={mountainCatalogue} roadCatalogue={roadCatalogue}/>}></Route>
        <Route
          path="/profile"
          element={<Profile cartCount={cartCount} />}
        ></Route>
        <Route
          path="/catalogue"
          element={
            <Catalogue
              cart={cart}
              setCart={setCart}
              setCartCount={setCartCount}
              cartCount={cartCount}
              MountainRoadAll={MountainRoadAll}
              setMountainRoadAll={setMountainRoadAll}
            />
          }
        ></Route>
        <Route
          path="/shopping%20cart"
          element={
            <ShoppingCart
              cart={cart}
              setCart={setCart}
              cartCount={cartCount}
              setCartCount={setCartCount}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
