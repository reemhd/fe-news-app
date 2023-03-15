import React, { useState, useContext } from "react";
import { postCommentByArticleId } from "../../utils/api";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ThemeContext } from "../../context/Theme";

export const CommentAdder = ({ article_id, setComments }) => {
  const [newComment, setNewComment] = useState("");
  // change below after auth set up
  const [username, setUsername] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  const users = [
    "tickle122",
    "grumpy19",
    "happyamy2016",
    "cooljmessy",
    "weegembump",
    "jessjelly",
    "choose for error",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAddingComment(true); //
    postCommentByArticleId(username, newComment, article_id)
      .then((data) => {
        setComments((prevComments) => [data.comment, ...prevComments]);
        setUsername("");
        setNewComment("");
        setIsAddingComment(false);
      })
      .catch((err) => {
        console.log(err);
        setIsAddingComment(false);
        setError("Comment not added, please try again");
      });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleUserSelect = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <br></br>
      <form onSubmit={handleSubmit}>
        <TextField
          id="comment-adder"
          label="Add Comment"
          multiline
          required
          value={newComment}
          onChange={handleCommentChange}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme === "dark" ? "#161c1d" : "#fbfbfb",
            color: theme === "dark" ? "#fbfbfb" : "#161c1d",
            "& label": {
              color: theme === "dark" ? "#fbfbfb" : "#161c1d",
            },
          }}
          inputProps={{
            style: {
              color: theme === "dark" ? "#fbfbfb" : "#161c1d",
            },
          }}
        />
        <div className="comment-adder__user-submit">
          <Select
            id="user-select"
            value={username}
            onChange={handleUserSelect}
            displayEmpty
            sx={{
              width: 140,
              height: 30,
              backgroundColor: theme === "dark" ? "#161c1d" : "#fbfbfb",
              color: theme === "dark" ? "#fbfbfb" : "#161c1d",
              border: theme === "dark" ? "1px solid white" : "",
            }}
          >
            <MenuItem value="" disabled>
              Select User
            </MenuItem>
            {users.map((user) => (
              <MenuItem value={user} key={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
          {isAddingComment ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="grey"
              className={
                theme === "dark"
                  ? "comment-adder__user-submit__button__outline"
                  : "comment-adder__user-submit__button"
              }
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
