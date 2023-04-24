import React, { useContext } from "react";
import logo1 from "../assets/logo1.png";
import ToggleLightMode from "./ToggleLightMode";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUser";
import { TextField } from "@mui/material";
import { ThemeContext } from "../context/Theme";

export const Header = ({ searchTerm, setSearchTerm }) => {
  const { currentUser, logout } = useContext(CurrentUserContext);
  const { theme } = useContext(ThemeContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="head">
      <div className="header">
        <Link to={"/"}>
          <img src={logo1} alt="logo" />
        </Link>
        <TextField
          id="outlined-search"
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
          variant="outlined"
          InputProps={{ style: { color: "white", height: "30px" } }}
          className="textfield-search"
        />
        {currentUser ? (
          <div className="header__profile">
            <img src={currentUser.avatar_url} alt="avatar" />
            <p>{currentUser.username}</p>
            <button className="header__profile__signout" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="face-signin">
            <Link
              to={"/signin"}
              style={{
                color:
                  theme === "dark"
                    ? "rgb(238, 238, 238)"
                    : "rgb(203, 201, 201)",
                textDecoration: "none",
              }}
            >
              <p className="signin">Sign in</p>
            </Link>
          </div>
        )}
      </div>
      <div className="search">
        <ToggleLightMode />
      </div>
    </div>
  );
};
