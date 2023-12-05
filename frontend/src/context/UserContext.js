import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //view user information in local storage and restore login status
  const checkLocalStorage = () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    checkLocalStorage(); 
  }, []);


  const loginStart = () => setIsLoading(true);
  const loginSuccess = (user) => {
    setIsLoading(false);
    setCurrentUser(user);

    //after login success, store user info into local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
  };


  const loginFailed = () => {
    setIsLoading(false);
    setError(true);
  };
  const logout = () => {
    setCurrentUser(null);
    //remove user info after logout
    setError(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (username, email, password) => {
    loginStart();
    try {
      const res = await axios.post("/users/register", { username, email, password });
      loginSuccess(res.data);
    } catch (err) {
        loginFailed(err.response.data.message || "An error occurred");;
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, isLoading, error, loginStart, loginSuccess, loginFailed, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};
