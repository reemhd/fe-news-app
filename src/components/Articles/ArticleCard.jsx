import React from "react";
import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  const {
    article_id,
    author,
    title,
    topic,
    article_img_url,
    comment_count,
    votes,
  } = article;
  return (
    <li key={article_id} className="article-card">
      <Link to={`/articles/${article_id}`}>
        <h2>{title}</h2>
        <h3>{author}</h3>
        <img
          src={article_img_url}
          alt="article img"
          className="article-card__img"
        />
      </Link>
      <p>{topic}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
    </li>
  );
};
