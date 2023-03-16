import React, { useState, useContext } from "react";
import { postCommentByArticleId } from "../../utils/api";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ThemeContext } from "../../context/Theme";
import { CurrentUserContext } from "../../context/CurrentUser";

export const CommentAdder = ({ article_id, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null)
  const { theme } = useContext(ThemeContext);

  const { currentUser } = useContext(CurrentUserContext);

  const removeMessage = () => {
    setSuccess(null)
    setError(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = currentUser.username;
    setIsAddingComment(true); 
    postCommentByArticleId(username, newComment, article_id)
      .then((data) => {
        setComments((prevComments) => [data.comment, ...prevComments]);
        setNewComment("");
        setIsAddingComment(false);
        setError(null);
        setSuccess('Comment Added!')
        setTimeout(removeMessage, 3000);
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

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
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
