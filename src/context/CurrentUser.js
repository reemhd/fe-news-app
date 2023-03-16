import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
    navigate('/')
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, logout }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
