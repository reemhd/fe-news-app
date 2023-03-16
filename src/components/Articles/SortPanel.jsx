import React, { useState, useContext } from "react";
import { MenuItem, Select } from "@mui/material";
import { ThemeContext } from "../../context/Theme";
import { useNavigate } from "react-router-dom";

export const SortPanel = ({ topic }) => {
  const [selectedSort, setSelectedSort] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const sortingOptions = [
    { label: "Author (A-Z)", sort_by: "author", order: "asc" },
    { label: "Author (Z-A)", sort_by: "author", order: "desc" },
    { label: "Title (A-Z)", sort_by: "title", order: "asc" },
    { label: "Title (Z-A)", sort_by: "title", order: "desc" },
    {
      label: "Comment count (High-Low)",
      sort_by: "comment_count",
      order: "desc",
    },
    {
      label: "Comment count (Low-High)",
      sort_by: "comment_count",
      order: "asc",
    },
    { label: "Votes (High-Low)", sort_by: "votes", order: "desc" },
    { label: "Votes (Low-High)", sort_by: "votes", order: "asc" },
    { label: "Posted (Newest-Oldest)", sort_by: "created_at", order: "desc" },
    { label: "Posted (Oldest-Newest)", sort_by: "created_at", order: "asc" },
  ];

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    const { sort_by, order } = sortingOptions.find(
      (option) => option.label === e.target.value
    );
    if (topic) {
      navigate(`/articles?topic=${topic}&sort_by=${sort_by}&order=${order}`);
    }
    navigate(`/articles?sort_by=${sort_by}&order=${order}`);
  };


  return (
    <div>
      <Select
        value={selectedSort}
        onChange={handleSortChange}
        id="sorting-select"
        displayEmpty
        sx={{
          width: 110,
          height: 25,
          marginLeft: 2,
          backgroundColor: theme === "dark" ? "#161c1d" : "#fbfbfb",
          color: theme === "dark" ? "#fbfbfb" : "#161c1d",
          border: theme === "dark" ? "1px solid white" : "",
        }}
      >
        <MenuItem value="" disabled>
          Sort By
        </MenuItem>
        {sortingOptions.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

/* 
can sort by author, title, comment_count, votes, created_at(default)
order by desc(default), asc
*/
