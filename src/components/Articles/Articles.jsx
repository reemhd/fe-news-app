import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../utils/api";
import { ArticleCard } from "./ArticleCard";
import { CircularProgress } from "@mui/material";
import { TopicsPanel } from "./TopicsPanel";
import { useLocation } from "react-router-dom";
import { SortPanel } from "./SortPanel";

export const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const topic = query.get("topic");
  const sort_by = query.get("sort_by")
  const order = query.get('order')

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(currentPage, topic, sort_by, order)
      .then((fetchedArticles) => {
        if (currentPage === 1) {
          setArticles(fetchedArticles);
        } else {
          setArticles((prevArticles) => [...prevArticles, ...fetchedArticles]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsDataLoaded(true);
        setIsLoading(false);
      });
  }, [currentPage, topic, sort_by, order]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
        <TopicsPanel />
        {isDataLoaded && (
          <SortPanel topic={topic}/>
        )}
      </div>
      <div className="articles-container">
        <ul className="articles-container__list">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </ul>
        {isLoading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};
