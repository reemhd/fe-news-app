// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
// import { Articles } from "./components/Articles/Articles";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Articles />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
