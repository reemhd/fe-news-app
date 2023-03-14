import axios from "axios";

const api = axios.create({
  baseURL: `https://backend-project-news-api.onrender.com/api/`,
});

export const fetchArticles = (currentPage) => {
  return api
    .get(`/articles?limit=10&p=${currentPage}`)
    .then(({ data: { articles } }) => articles);
};

export const fetchArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data: { article } }) => {
    return article;
  });
};

export const fetchCommentsByArticleId = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data: {comments} }) => {
    return comments;
  });
};

fetchCommentsByArticleId(1)
