import React, { useEffect, useState, useContext } from "react";
import { fetchCommentsByArticleId } from "../../api";
import { Card, CardContent } from "@mui/material";
import { ThemeContext } from "../../context/Theme";

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
      {comments.map((comment) => (
        <Card
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
            <p>comment votes: {comment.votes}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
