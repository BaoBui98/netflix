import React, { Fragment, useState, createContext } from "react";
import { HiSearch } from "react-icons/hi";
import "../Style/NavbarStyle.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Moview from "./Movie";
import Home from "./Home";
import Pricing from "./Pricing";
import Trends from "./Trends";
export const Container = createContext();
const Navbar = () => {
  const [toggle, setToggle] = useState(true);
  const [inPutValue, setInputValue] = useState("");
  return (
    <Container.Provider value={{ toggle, inPutValue }}>
      <Fragment>
        <nav>
          <div className="navbar-content">
            <div className="navbar-content-header">
              <h3 id={toggle ? "header-red" : ""}>Netflix</h3>
            </div>
            <div className="navbar-content-title">
              <NavLink to="/">
                <span className={toggle ? "tilt-yellow" : ""}>Home</span>
              </NavLink>

              <NavLink to="movie">
                <span className={toggle ? "tilt-yellow" : ""}>Movie</span>
              </NavLink>
              <NavLink to="trend">
                <span className={toggle ? "tilt-yellow" : ""}>Trend</span>
              </NavLink>
            </div>
          </div>
          <div className="navbar-input">
            <div className="navbar-search">
              <input
                placeholder="What ever you want ?"
                value={inPutValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <HiSearch id="search" />
            </div>

            <div className="navbar-switcher" onClick={() => setToggle(!toggle)}>
              <div
                className={toggle ? "switcher-moved" : "switcher-mover"}
              ></div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie" element={<Moview />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="trend" element={<Trends />}></Route>
        </Routes>
      </Fragment>
    </Container.Provider>
  );
};

export default Navbar;
