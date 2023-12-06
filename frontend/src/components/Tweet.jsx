import axios from "axios";
import React, { useState, useEffect} from "react";
import formatDistance from "date-fns/formatDistance";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";


const Tweet = ({ tweet }) => {
  const [userData, setUserData] = useState();
  const { currentUser } = useUser();
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());


  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);
        setUserData(findUser.data);
        setUpdatedDescription(tweet.description); 
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [tweet.userId, tweet.description]);

  // console.log("tweet.createdAt", tweet.createdAt);

  const handleDelete = async () => {
    try {
      await axios.delete(`/tweets/${tweet._id}`);
      // onDelete(tweet._id); // Notify parent component to remove the tweet from the state
      window.location.reload(false);
      console.log("tweet deleted!");
    } catch (err) {
      console.log("error when delete", err);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleUpdate = async () => {
    try {
      const updateData = {
        // Include the properties you want to update
        // For example:
        description: updatedDescription,
      };
      toggleEditMode();

      await axios.put(`/tweets/${tweet._id}`, updateData);
      // onDelete(tweet._id); // Notify parent component to remove the tweet from the state
      window.location.reload(false);
      console.log("tweet updated!");
    } catch (err) {
      console.log("error when update", err);
    }
  };


  return (
    <div>
      {userData && (
        <>
        <div className="flex space-x-2">
          <Link to={`/profile/${userData._id}`}>
            <h3 className="font-bold">{userData.username}</h3>
          </Link>
          <span className="font-normal text-gray-600">@{userData.username}</span>
          <p className="text-gray-600"> · {dateStr}</p>
        </div>
          
        {/* edit mode change */}
        {editMode ? (
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="w-full p-2 bg-slate-200 rounded-lg"
          />
        ) : (
          <p className="break-words">{tweet.description}</p>
        )}
  
        {/* update and delete button */}
        {tweet.userId === currentUser?._id && (
          <div className="flex space-x-2 items-center">
            <button onClick={handleDelete} className="text-red-500">
              Delete
            </button>
            <button onClick={toggleEditMode} className="text-blue-500">
              {editMode ? "Cancel" : "Update"}
            </button>
          </div>
        )}
  
        {/* update save button*/}
        {editMode && (
          <button onClick={handleUpdate} className="text-blue-500">
            Save
          </button>
        )}
        </>
      )}
      <hr className="my-2 border-t border-gray-200" />
    </div>
  );
}

export default Tweet
