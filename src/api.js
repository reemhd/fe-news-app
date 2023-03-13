import axios from "axios";

const api = axios.create({
  baseURL: `https://backend-project-news-api.onrender.com/api/`,
});

export const fetchArticles = (currentPage) => {
  return api
    .get(`/articles?limit=10&p=${currentPage}`)
    .then(({ data: { articles } }) => {
        console.log(articles)
      return articles;
    });
};