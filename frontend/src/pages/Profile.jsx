import React, { useState, useEffect }from 'react';
import LeftSideBar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";

import axios from 'axios';
import Tweet from "../components/Tweet";
import EditProfile from '../components/EditProfile';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { currentUser } = useUser();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`/tweets/user/all/${id}`);
        const userProfile = await axios.get(`/users/find/${id}`);
        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch(err) {
        console.log("err", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
            <LeftSideBar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
          {currentUser && currentUser._id === id && (
              <button className="px-4 -y-2 bg-blue-500 rounded-full text-white"
              onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            )}
            {userProfile && (
              <div className="text-sm text-gray-500">
                Joined: {formatDate(userProfile.createdAt)}
              </div>
            )}


          </div>
          <div className="mt-6">
              {userTweets &&
                userTweets.map((tweet) => {
                  return (
                    <div className="p-2" key={tweet._id}>
                      <Tweet tweet={tweet} setData={setUserTweets} />
                    </div>
                  );
                })}
            </div>
        </div>

        <div className="px-6">
            <RightSidebar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  )
}

export default Profile