import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";

import UserPlaceholder from "./UserPlaceholder";


const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;
  return (
    <div className="fixed top-0 md:w-9/12 z-10 grid grid-cols-1 md:grid-cols-4 py-5 justify-center bg-white">
      <div className="mx-auto md:mx-0">
        <img
          src="/logo.jpg"
          alt="Twitter Logo"
          width={"40px"}
          className="ml-8"
        />
      </div>

      <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ): (
              "Home"
            )}
          </h2>
          <StarBorderPurple500Icon />
        </div>
      </div>

      <div className="px-0 md:px-6 mx-auto">
        <SearchIcon className="absolute m-2" />
        <input type="text" className="bg-slate-200 rounded-full py-2 px-8" />
      </div>

      
    </div>
  );
};

export default Navbar