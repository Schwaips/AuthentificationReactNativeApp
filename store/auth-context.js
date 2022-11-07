import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {}, // change context if sign up or login sucessfully.
  logout: () => {}, // change context if logout
});


function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
  }

  function logOut() {
    setAuthToken(null)
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logOut: logOut, // expose method to any part of the app that want to work with context.
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export default AuthContextProvider;
