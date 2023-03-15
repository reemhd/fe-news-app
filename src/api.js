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
  return api.get(`/articles/${article_id}/comments`).then(({ data: {comments} }) => comments);
};

export const changeVotesOnArticle = (vote, article_id) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then(({ data: { updated } }) => {
      console.log(updated)
      return updated
    });
};

export const postCommentByArticleId = (username, newComment, article_id) => {
  return api
    .post(`/articles/${article_id}/comments`, { username, body: newComment })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
}

