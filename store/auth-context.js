import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {}, // change context if sign up or login sucessfully.
  logout: () => {}, // change context if logout
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    // store token on the device
    // first argument is a key name, second argument is the value of the key.
    // Second argument needs to be a string.
    AsyncStorage.setItem('token', token)
  }

  function logOut() {
    setAuthToken(null);
    // When logging out , we remove the token from the phone
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logOut, // expose method to any part of the app that want to work with context.
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
