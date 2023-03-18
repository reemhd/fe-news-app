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
          width: "100%",
          maxWidth: 500,
          height: 600,
          marginTop: 5,
          gap: 1,
          padding: 5,
          backgroundColor: theme === "dark" ? "#161c1d" : "rgb(238, 238, 238)",
          color: theme === "dark" ? "#fbfbfb" : "rgb(61, 61, 61)",
          "@media (max-width: 425px)": {
            height: 500,
            maxWidth: "100%",
            padding: 3,
          },
          "&:hover": {
            backgroundColor:
              theme === "dark" ? "rgb(64, 64, 64)" : "rgb(198, 198, 198)",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Link
          to={`/articles/${article_id}`}
          style={{
            color: theme === "dark" ? "rgb(238, 238, 238)" : "rgb(61, 61, 61)",
            textDecoration: "none",
          }}
        >
          <h4 className="article-title" style={{ flex: 1 }}>
            {title}
          </h4>
          <h5 style={{ flex: 1 }}>{author}</h5>
          <p>{new Date(created_at).toLocaleDateString()}</p>
          <img
            src={article_img_url}
            alt="article img"
            className="article-card__img"
            style={{ flex: 1 }}
          />
        </Link>
        <p className="italic">{topic}</p>
      </Card>
    </div>
  );
};
