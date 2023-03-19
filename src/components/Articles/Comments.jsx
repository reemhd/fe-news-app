import React, { useEffect, useState, useContext } from "react";
import { fetchCommentsByArticleId } from "../../utils/api";
import {
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ThemeContext } from "../../context/Theme";
import { CommentAdder } from "./CommentAdder";
import { deleteCommentByCommentId } from "../../utils/api";
import { CurrentUserContext } from "../../context/CurrentUser";

export const Comments = ({ article_id }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [comments, setComments] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [deleted, setDeleted] = useState(null);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((comments) =>
      setComments(comments)
    );
  }, [article_id]);

  const removeMessage = () => {
    setDeleted(null);
    setErrorDeleting(null);
  };

  const handleCommentDelete = (comment_id) => {
    setDeletingCommentId(comment_id);
    deleteCommentByCommentId(comment_id)
      .then(() => {
        setDeleted("Comment Deleted!");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeletingCommentId(null);
        setTimeout(removeMessage, 3000);
      })
      .catch((err) => {
        setDeletingCommentId(null);
        setErrorDeleting('Error deleting comment, please try again')
        console.log(err);
      });
  };

  return (
    <div className={`${theme}`}>
      <h2>Comments</h2>
      <CommentAdder article_id={article_id} setComments={setComments} />
      <br></br>
      {deleted && <Alert severity="success">{deleted}</Alert>}
      {errorDeleting && <Alert severity="error">{errorDeleting}</Alert>}
      {comments.map((comment, index) => (
        <Card
          key={index}
          sx={{
            marginTop: 2,
            backgroundColor: theme === "dark" ? "#161c1d" : "#fbfbfb",
            color: theme === "dark" ? "#fbfbfb" : "#161c1d",
            "&:hover": {
              backgroundColor:
                theme === "dark"
                  ? "rgb(64, 64, 64)"
                  : "rgba(229, 228, 228, 0.72)",
            },
          }}
        >
          <CardContent>
            <h4>{comment.author}</h4>
            <p>{comment.body}</p>
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            <p>
              {new Date(comment.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>comment votes: {comment.votes}</p>
            {currentUser?.username === comment.author && (
              <React.Fragment>
                {deletingCommentId === comment.comment_id ? (
                  <CircularProgress size={20} sx={{ ml: 2 }} />
                ) : (
                  <Button
                    type="submit"
                    onClick={() => handleCommentDelete(comment.comment_id)}
                    variant="contained"
                    color="grey"
                    className={
                      theme === "dark"
                        ? "comment-adder__user-delete__button__outline"
                        : "comment-adder__user-delete__button"
                    }
                  >
                    Delete
                  </Button>
                )}
              </React.Fragment>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
