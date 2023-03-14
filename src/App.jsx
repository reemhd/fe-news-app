// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Articles } from "./components/Articles/Articles";
import { ThemeContext, ThemeProvider } from "./context/Theme";
import { useContext, useEffect } from "react";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
      <div className={`App ${theme}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Articles />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
