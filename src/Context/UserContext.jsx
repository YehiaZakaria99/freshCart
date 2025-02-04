import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    localStorage.getItem("userToken") &&
    setUserToken(localStorage.getItem("userToken"));
    if(userToken){
      setUserToken(userToken);    
    }
  }, [userToken]);
  return (
    <userContext.Provider
      value={{ userToken, setUserToken, userEmail, setUserEmail }}
    >
      {children}
    </userContext.Provider>
  );
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTAzMjBjNGUzZjIyNTRkNjdlZmM4YyIsImlhdCI6MTczODY4ODAyOSwiZXhwIjoxNzQ2NDY0MDI5fQ.TGpEcMtDRpNPUnPEZzw71h7RCqGZJbpmtqQcFKwuxpM
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTAzMjBjNGUzZjIyNTRkNjdlZmM4YyIsImlhdCI6MTczODY4ODMxNSwiZXhwIjoxNzQ2NDY0MzE1fQ.2qSfiza8gsmqJEKeBD-D9YnTYmZha1zTNLmUrLS5--I