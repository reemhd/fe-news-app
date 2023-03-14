import React from 'react'
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";


export const Footer = () => {
  return (
    <div className="footer">
      <BottomNavigation showLabels className="footer__bottom_nav">
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon sx={{ color: "white" }} />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon sx={{ color: "white" }} />}
          component={Link}
          to="/search"
        />
        <BottomNavigationAction
          label="Bookmarks"
          icon={<BookmarkIcon sx={{ color: "white" }} />}
          component={Link}
          to="/bookmarks"
        />
      </BottomNavigation>
    </div>
  );
}
