import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Catalogue } from "./Catalogue";
import HomePage from "./HomePage";
import { Profile } from "./Profiles";
import { ShoppingCart } from "./ShoppingCart";

export const RouteSwitch = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/catalogue" element={<Catalogue/>}></Route>
                <Route path="/shopping%20cart" element={<ShoppingCart/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}