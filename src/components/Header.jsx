import React from "react";
import placeholder from "../logo/placeholder.png";
import Face2Icon from "@mui/icons-material/Face2";
import ToggleLightMode from "./ToggleLightMode";

export const Header = () => {
  return (
    <header className="header">
      <img src={placeholder} alt="logo" />
      <ToggleLightMode />
      <button className="header__profile">
        <Face2Icon />
      </button>
    </header>
  );
};
