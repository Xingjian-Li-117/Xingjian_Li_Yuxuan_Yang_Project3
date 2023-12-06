import React, { useState } from 'react';
import axios from 'axios';

import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const { loginStart, loginSuccess, loginFailed } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    loginStart();
    try {
      const res = await axios.post("/users/login", { username, password });
      loginSuccess(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      loginFailed();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    loginStart();
    //check empty
    if (!registerUsername || !registerEmail || !registerPassword) {
      setError("Please fill in all fields");
      loginFailed();
      return;
    }
    try {
      const res = await axios.post("/users/register", {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword
      });
      loginSuccess(res.data); 
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      loginFailed();
    }
  };

  return (
    <div className="bg-gray-200 py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto">
      <form className="flex flex-col gap-4 mb-10">
        <input 
          onChange={(e) => setUsername(e.target.value)} 
          type="text" 
          placeholder="username" 
          className="text-xl py-2 rounded-full px-4" 
        />
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          placeholder="password" 
          className="text-xl py-2 rounded-full px-4" 
        />
        <button 
          onClick={handleLogin} 
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        >
          Log in
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>} 
      
      <p className="text-center text-xl">Don't have an account?</p>
      

      <form className="flex flex-col gap-4">
        <input 
          onChange={(e) => setRegisterUsername(e.target.value)} 
          type="text" 
          placeholder="username" 
          className="text-xl py-2 rounded-full px-4" 
        />
        <input 
          onChange={(e) => setRegisterEmail(e.target.value)} 
          type="email" 
          placeholder="email" 
          required className="text-xl py-2 rounded-full px-4" 
        />
        <input 
          onChange={(e) => setRegisterPassword(e.target.value)} 
          type="password" 
          placeholder="password" 
          className="text-xl py-2 rounded-full px-4" 
        />
        <button 
          onClick={handleRegister} 
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        >
            Sign up
        </button>
      </form>
    </div>
  );
};

export default Login