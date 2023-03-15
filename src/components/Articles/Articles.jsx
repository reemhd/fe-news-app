import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../utils/api";
import { ArticleCard } from "./ArticleCard";
import { CircularProgress } from "@mui/material";
import { TopicsPanel } from "./TopicsPanel";
import { useLocation } from "react-router-dom";


export const Articles = () => {
  // const [searchOptions, setSearchOptions] = useState("null");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery()
  const topic = query.get('topic')

   useEffect(() => {
     setIsLoading(true);
     fetchArticles(currentPage, topic)
       .then((fetchedArticles) => {
         if (currentPage === 1) {
           setArticles(fetchedArticles);
         } else {
           setArticles((prevArticles) => [...prevArticles, ...fetchedArticles]);
         }
       })
       .catch((error) => console.error(error))
       .finally(() => setIsLoading(false));
   }, [currentPage, topic]);


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
      </div>
      <div className="articles-container">
        <ul className="articles-container__list">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
            />
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
