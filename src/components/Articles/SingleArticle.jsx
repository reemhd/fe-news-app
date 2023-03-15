import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, changeVotesOnArticle } from "../../api";
import { Card, Typography } from "@mui/material";
import { ThemeContext } from "../../context/Theme";
import { Comments } from "./Comments";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setVotes(article.votes);
      })
      .catch((err) => console.log(err));
  }, [article_id]);

  const handleVote = (vote) => {
    setVotes((prevVotes) => prevVotes + vote);
    const newVotes = votes + vote;
    setArticle((prevArticle) => ({ ...prevArticle, votes: newVotes }));
    changeVotesOnArticle(vote, article_id)
      .then((updatedArticle) => {
        setVotes(updatedArticle.votes);
      })
      .catch((err) => {
        console.log(err);
        setVotes(votes);
        setError('You vote did not count, please try again')
      });
  };

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
        <div className="single-article__votes">
          <p>Article votes: {article.votes}</p>
          <button onClick={() => handleVote(1)}>+</button>
          <button onClick={() => handleVote(-1)}>-</button>
        </div>
        {error && (
          <Typography className="single-article__error" color="error">
            {error}
          </Typography>
        )}
        <Comments article_id={article_id} />
      </Card>
    </div>
  );
};
