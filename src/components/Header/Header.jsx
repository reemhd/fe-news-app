import React from 'react'
import './Header.css'
import placeholder from '../../logo/placeholder.png'
import Face2Icon from "@mui/icons-material/Face2";

export const Header = () => {
  return (
    <header className="header">
      <img src={placeholder} alt="logo" />
      <button className="header__profile">
        <Face2Icon />
      </button>
    </header>
  );
}
