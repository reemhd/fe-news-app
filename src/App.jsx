import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Articles } from "./components/Articles/Articles";
import { ThemeContext } from "./context/Theme";
import { useContext } from "react";
import { SingleArticle } from "./components/Articles/SingleArticle";
import SignIn from "./components/SignIn";

function App() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const isSignInPage = location.pathname === '/signin'

  return (
    <div className={`App ${theme}`}>
      {!isSignInPage && <Header />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
      {!isSignInPage && <Footer />}
    </div>
  );
}

export default App;
