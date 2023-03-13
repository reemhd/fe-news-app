// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from './components/Header/Header'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
