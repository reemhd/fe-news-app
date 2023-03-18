import React, { useEffect, useState } from "react";
import { fetchAllTopics } from "../../utils/api";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const TopicsPanel = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllTopics().then((topicList) => {
      const topicsFromAPI = topicList.map((topic) => topic.slug);
      setTopics(topicsFromAPI);
    });
  }, []);

  const handleClick = (topic) => {
    navigate(`/articles?topic=${topic}`);
  }

  return (
    <div className="topics-panel">
      <List
        className="topics-list"
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 0,
        }}
      >
        {topics.map((topic) => (
          <ListItem
            button
            sx={{
              backgroundColor: "rgba(128, 125, 125, 0.51)",
              textAlign: "center",
              "&:hover": {
                backgroundColor: "rgba(48, 47, 47, 0.51)",
                color: "#fff",
              },
            }}
            key={topic}
            onClick={() => handleClick(topic)}
          >
            <ListItemText primary={topic} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
