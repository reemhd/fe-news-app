import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Articles } from "./components/Articles/Articles";
import { ThemeContext } from "./context/Theme";
import { useContext } from "react";
import { SingleArticle } from "./components/Articles/SingleArticle";
import SignIn from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { WrongPathError } from "./components/WrongPathError";

function App() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const isSignInUpPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className={`App ${theme}`}>
      {!isSignInUpPage && <Header />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/*" element={<WrongPathError />} />
      </Routes>
      {!isSignInUpPage && <Footer />}
    </div>
  );
}

export default App;
