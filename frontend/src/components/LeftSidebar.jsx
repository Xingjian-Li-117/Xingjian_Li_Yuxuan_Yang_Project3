import React from 'react'
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useUser } from "../context/UserContext";

const LeftSideBar = () => {
  const { currentUser, logout } = useUser();
  return (
    <div className="sticky top-[60px] h-screen flex flex-col h-full md:h-[90vh] justify-between mr-6">
        <div className="mt-6 flex flex-col space-y-4">
            <Link to="/">
                <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                    <HomeIcon fontSize='large' />
                    <p>Home</p>
                </div>
            </Link>
            {currentUser && (
              <Link to={`/profile/${currentUser._id}`}>
                  <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                      <PersonIcon fontSize='large' />
                      <p>Profile</p>
                  </div>
              </Link>
            )}
        </div>
        <div className="flex mt-auto justify-between mb-6"> 
        {currentUser ? (
          <>
            <div>
              <p className="font-bold">{currentUser.username}</p> 
              <p className="font-bold">@{currentUser.username}</p>
            </div>
            <div>
              <button onClick={logout} className="bg-red-500 px-4 py-2 text-white rounded-full">
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-blue-500 px-4 py-2 text-white rounded-full">
              Login/Register
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default LeftSideBar