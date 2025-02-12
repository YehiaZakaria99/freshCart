import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <userContext.Provider
      value={{ userToken, setUserToken, userEmail, setUserEmail }}
    >
      {children}
    </userContext.Provider>
  );
}
