// MainTweet.js
import React, {useState} from 'react';
import TimelineTweet from './TimelineTweet';
import axios from 'axios';
import { useUser } from "../context/UserContext";


const MainTweet = ({showTimeline = true}) => {
  const { currentUser } = useUser();
  const [tweetText, setTweetText] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      await axios.post("/tweets", {
          userId: currentUser._id,
          description: tweetText,
      });
      setTweetText("");
      window.location.reload(false);
      
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      {currentUser ? (
        <>
          <p className="font-bold pl-2 my-2">{currentUser.username}</p>
          <form className="border-b-2 pb-6">
            <textarea
              onChange={(e) => setTweetText(e.target.value)}
              type="text"
              placeholder="What's happening?"
              maxLength={100}
              className="bg-slate-200 rounded-lg w-full p-2"
              value={tweetText}
            ></textarea>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-1.5 px-6 rounded-full ml-auto"
            >
              Tweet
            </button>
          </form>
        </>
      ) : (
        <p className="text-center my-4">Please log in to post tweets.</p>
      )}
      {showTimeline && <TimelineTweet />}
    </div>
  );
}

export default MainTweet;