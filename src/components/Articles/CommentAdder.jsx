import React, { useState } from "react";
import { postCommentByArticleId } from "../../api";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  CircularProgress,
  Alert
} from "@mui/material";

export const CommentAdder = ({ article_id, setComments }) => {
  const [newComment, setNewComment] = useState("");
  // change below after auth set up
  const [username, setUsername] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [error, setError] = useState(null);

  const users = [
    "tickle122",
    "grumpy19",
    "happyamy2016",
    "cooljmessy",
    "weegembump",
    "jessjelly",
    "choose for error"
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAddingComment(true) //
    postCommentByArticleId(username, newComment, article_id)
      .then((data) => {
        setComments((prevComments) => [data.comment, ...prevComments]);
        setUsername("");
        setNewComment("");
        setIsAddingComment(false)
      })
      .catch((err) => {
        console.log(err);
        setIsAddingComment(false);
        setError("Comment not added, please try again")
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
          value={newComment}
          onChange={handleCommentChange}
          variant="outlined"
          fullWidth
        />
        <div className="comment-adder__user-submit">
          <Select
            id="user-select"
            value={username}
            onChange={handleUserSelect}
            displayEmpty
            sx={{ width: 140, height: 30 }}
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
              className="comment-adder__user-submit__button"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
