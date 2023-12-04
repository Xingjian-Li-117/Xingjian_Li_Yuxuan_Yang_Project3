import axios from "axios";
import React, { useState, useEffect} from "react";
import formatDistance from "date-fns/formatDistance";
import { Link } from "react-router-dom";



const Tweet = ({ tweet }) => {
  const [userData, setUserData] = useState();
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());


  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);
        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId]);

  console.log("tweet.createdAt", tweet.createdAt);



  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2 ">
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>

            <span className="font-normal text-gray-600">@{userData.username}</span>
            <p className="text-gray-600"> · {dateStr}</p>
          </div>
          <p>{tweet.description}</p>
        </>
      )}
      <hr className="my-2 border-t border-gray-200" />
    </div>
  )
}

export default Tweet