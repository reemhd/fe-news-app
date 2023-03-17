import { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import { ThemeContext } from "../../context/Theme";

export const ArticleCard = ({ article }) => {
  const {
    article_id,
    author,
    title,
    topic,
    article_img_url,
    created_at,
  } = article;
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`trial ${theme}`}>
      <Card
        sx={{
          width: 500,
          marginTop: 5,
          padding: 5,
          backgroundColor: theme === "dark" ? "#161c1d" : "#fbfbfb",
          color: theme === "dark" ? "#fbfbfb" : "#161c1d",
        }}
      >
          <Link to={`/articles/${article_id}`}>
            <h4 className="article-title">{title}</h4>
            <h5>{author}</h5>
            <p>{new Date(created_at).toLocaleDateString()}</p>
            <img
              src={article_img_url}
              alt="article img"
              className="article-card__img"
            />
          </Link>
          <p className="italic">{topic}</p>
      </Card>
    </div>
  );
};
