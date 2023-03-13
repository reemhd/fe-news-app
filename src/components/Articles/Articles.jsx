import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import { ArticleCard } from "./ArticleCard";
import "./Articles.css";

export const Articles = () => {
  const [searchOptions, setSearchOptions] = useState("null");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles(currentPage)
      .then((articles) => {
        setArticles((previousArticles) => [...previousArticles, ...articles]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

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
    <div className="articles-container">
      <ul className="articles-container__list">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </ul>
      {isLoading && <p className="loading-message">Loading...</p>}
    </div>
  );
};
