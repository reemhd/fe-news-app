import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUser";
import { signInUser } from "../utils/api";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const {setCurrentUser} = useContext(CurrentUserContext);

  const handleSignIn = (e) => {
    
  }

  return <div>SignIn</div>;
};
