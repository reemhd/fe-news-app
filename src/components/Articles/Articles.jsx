import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../utils/api";
import { ArticleCard } from "./ArticleCard";
import { CircularProgress } from "@mui/material";
import { TopicsPanel } from "./TopicsPanel";
import { useLocation } from "react-router-dom";
import { SortPanel } from "./SortPanel";

export const Articles = ({ searchTerm = undefined, setSearchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [errorAPI, setErrorAPI] = useState(null);
  const location = useLocation();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const topic = query.get("topic");
  const sort_by = query.get("sort_by");
  const order = query.get("order");

  useEffect(() => {
    setIsLoading(true);
    setErrorAPI(null);
    setErrorCode(null);
    fetchArticles(currentPage, topic, sort_by, order)
      .then((fetchedArticles) => {
        if (currentPage === 1) {
          setArticles(fetchedArticles);
        } else {
          setArticles((prevArticles) => [...prevArticles, ...fetchedArticles]);
        }
      })
      .catch((err) => {
        setErrorCode(err.response.status);
        setErrorAPI(err.response.data.message);
        console.log(err);
      })
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
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, topic, sort_by, order]);

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
  }, [topic, location, setSearchTerm]);

  let filteredArticles = [];
  if (searchTerm !== undefined) {
    filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  if (topic && errorCode) {
    return (
      <div className="error error-text">{`${errorCode} / Topic Not Found`}</div>
    );
  }

  if ((sort_by || order) && errorCode) {
    return (
      <div className="error error-text">{`${errorCode} / ${errorAPI}`}</div>
    );
  }

  return (
    <>
      <div>
        <TopicsPanel />
      </div>
      <div className={!isDataLoaded ? "" : "articles-container"}>
        {isDataLoaded && <SortPanel topic={topic} />}
        <ul className="articles-container__list">
          {filteredArticles.length === 0 && isDataLoaded ? (
            <div className="no-articles-message">No articles found</div>
          ) : (
            (searchTerm ? filteredArticles : articles).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))
          )}
        </ul>
        {isLoading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
        {currentPage !== 1 ? (<button
          className="scroll-to-top-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Scroll to Top
        </button>) : <></>}
        
      </div>
    </>
  );
};
