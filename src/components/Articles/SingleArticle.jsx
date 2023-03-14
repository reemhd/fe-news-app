import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../api";
import { Card } from "@mui/material";
import { ThemeContext } from "../../context/Theme";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((article) => setArticle(article))
      .catch((err) => console.log(err));
  }, [article_id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`single-article ${theme}`}>
      <Card
        sx={{
          width: 500,
          marginTop: 5,
          padding: 5,
          backgroundColor: theme === "dark" ? "#161c1d" : "#fbfbfb",
          color: theme === "dark" ? "#fbfbfb" : "#161c1d",
        }}
      >
        <h2>{article.title}</h2>
        <p>{article.topic}</p>
        <h3>{article.author}</h3>
        <img
          src={article.article_img_url}
          alt="article img"
          className="single-article__img"
        />
        <p className="single-article__body">{article.body}</p>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </Card>
    </div>
  );
};
