import axios from "axios";

const api = axios.create({
  baseURL: `https://backend-project-news-api.onrender.com/api/`,
});

  export const fetchArticles = (currentPage, topic = null, sort_by, order) => {
    const queryParams = {
      limit: 10,
      p: currentPage
    }
    if (sort_by) queryParams['sort_by'] = sort_by;
    if (order) queryParams['order'] = order;
    if (topic) queryParams['topic'] = topic

    const queryString = Object.entries(queryParams)
      .map(([k, v]) => `${k}=${v}`)
      .join("&")

    const url = `/articles?${queryString}`

    return api.get(url).then(({ data: { articles } }) => {
      return articles;
  });
};


export const fetchArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data: { article } }) => {
    return article;
  });
};

export const fetchCommentsByArticleId = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => comments);
};

export const changeVotesOnArticle = (vote, article_id) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then(({ data: { updated } }) => {
      return updated;
    });
};

export const postCommentByArticleId = (username, newComment, article_id) => {
  return api
    .post(`/articles/${article_id}/comments`, { username, body: newComment })
    .then(({ data }) => {
      return data;
    });
};

export const fetchAllTopics = () => {
  return api.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};
