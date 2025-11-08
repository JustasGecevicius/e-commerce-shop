import { useState } from "react";
import "./App2.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import { Profile } from "./Profiles";
import { Catalogue } from "./Catalogue";
import { ShoppingCart } from "./ShoppingCart";
import ScrollToTop from "./ScrollToTop";
import { initializeApp } from "firebase/app";

export const App = () => {
  console.log("TESTTEST");
  const [cart, setCart] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [MountainRoadAll, setMountainRoadAll] = useState("all");

  const mountainCatalogue = () => {
    setMountainRoadAll("mountain");
  };

  const roadCatalogue = () => {
    setMountainRoadAll("road");
  };

  const firebaseConfig = {
    apiKey: "AIzaSyAjWsF01onILcLxPF3xflwDm5gyNqBh0ZE",
    authDomain: "e-commerce-11ece.firebaseapp.com",
    projectId: "e-commerce-11ece",
    storageBucket: "e-commerce-11ece.appspot.com",
    messagingSenderId: "341589599796",
    appId: "1:341589599796:web:8261420e27b8dff291cc61",
  };

  const app = initializeApp(firebaseConfig);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/e-commerce-shop"
          element={
            <HomePage
              cartCount={cartCount}
              mountainCatalogue={mountainCatalogue}
              roadCatalogue={roadCatalogue}
            />
          }
        ></Route>
        <Route path="/e-commerce-shop/profile" element={<Profile cartCount={cartCount} />}></Route>
        <Route
          path="/e-commerce-shop/catalogue"
          element={
            <Catalogue
              cart={cart}
              setCart={setCart}
              setCartCount={setCartCount}
              cartCount={cartCount}
              MountainRoadAll={MountainRoadAll}
              setMountainRoadAll={setMountainRoadAll}
              app={app}
            />
          }
        ></Route>
        <Route
          path="/e-commerce-shop/shopping%20cart"
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
