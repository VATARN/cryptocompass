import React, { useEffect, useState } from "react";
import Button from "./button";
import TemporaryDrawer from "./drawer";
import "../CSS/header.css";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import logo from "../Assets/logo.webp";

function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const localStorageVal = localStorage.getItem("theme");
  useEffect(() => {
    if (localStorageVal) {
      if (localStorageVal === "dark") {
        setDark();
      } else {
        setLight();
      }
    } else {
      setDark();
    }
  }, []);

  const changeMode = () => {
    if (localStorageVal) {
      setDark();
    } else {
      setLight();
    }
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  return (
    <div className="header">
      <h1>
        <img src={logo} className="logo" alt="logo" /> CryptoCompass<span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className="links">
        <Switch checked={darkMode} onClick={() => changeMode()} />
        <a href="/">
          <p className="link">Home</p>
        </a>
        <a href="/compare">
          <p className="link">Compare</p>
        </a>
        <a href="/news">
          <p className="link">News</p>
        </a>
        <a href="/watchlist">
          <p className="link">Watchlist</p>
        </a>
        <a href="/dashboard">
          <Button text={"dashboard"} clickFn={() => { console.log("Dashboard clicked!") }} outlined={false} />
        </a>
      </div>
      <div className="drawer-component">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
