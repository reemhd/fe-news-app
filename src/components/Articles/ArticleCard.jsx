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
    created_at
  } = article;

  return (
    <li key={article_id} className="article-card">
      <Link to={`/articles/${article_id}`} className="article-card__link">
        <h2>{title}</h2>
        <h3>{author}</h3>
        <p>{new Date(created_at).toLocaleDateString()}</p>
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
