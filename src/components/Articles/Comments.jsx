import React, { useEffect, useState, useContext } from "react";
import { fetchCommentsByArticleId } from "../../utils/api";
import { Button, Card, CardContent } from "@mui/material";
import { ThemeContext } from "../../context/Theme";
import { CommentAdder } from "./CommentAdder";

export const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((comments) =>
      setComments(comments)
    );
  }, [article_id]);

  return (
    <div className={`${theme}`}>
      <h2>Comments</h2>
      <CommentAdder article_id={article_id} setComments={setComments} />
      {comments.map((comment, index) => (
        <Card
          key={index}
          sx={{
            marginTop: 2,
            backgroundColor: theme === "dark" ? "#161c1d" : "#fbfbfb",
            color: theme === "dark" ? "#fbfbfb" : "#161c1d",
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
            <Button
              type="submit"
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
