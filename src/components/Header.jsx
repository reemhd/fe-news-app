import React, { useContext } from "react";
import placeholder from "../logo/placeholder.png";
import Face2Icon from "@mui/icons-material/Face2";
import ToggleLightMode from "./ToggleLightMode";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUser";
import { TextField } from "@mui/material";

export const Header = ({ searchTerm, setSearchTerm }) => {
  const { currentUser, logout } = useContext(CurrentUserContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <header className="header">
        <Link to={"/"}>
          <img src={placeholder} alt="logo" />
        </Link>
        <ToggleLightMode />
        {currentUser ? (
          <div className="header__profile">
            <img src={currentUser.avatar_url} alt="avatar" />
            <p>{currentUser.username}</p>
            <button className="header__profile__signout" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/signin"}>
            <button className="header__no_profile">
              <Face2Icon />
            </button>
          </Link>
        )}
      </header>
      <div className="header search">
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
      </div>
    </>
  );
};
