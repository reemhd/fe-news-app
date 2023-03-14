import React from "react";
import placeholder from "../logo/placeholder.png";
import Face2Icon from "@mui/icons-material/Face2";
import ToggleLightMode from "./ToggleLightMode";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <Link to={'/'}>
      <img src={placeholder} alt="logo" />
      </Link>
      <ToggleLightMode />
      <button className="header__profile">
        <Face2Icon />
      </button>
    </header>
  );
};
