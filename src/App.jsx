// import logo from './logo.svg';
import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Articles } from "./components/Articles/Articles";
import { ArticleCard } from "./components/Articles/ArticleCard";
import { ThemeContext, ThemeProvider } from "./context/Theme";
import { useContext, useEffect } from "react";
import { SingleArticle } from "./components/Articles/SingleArticle";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
