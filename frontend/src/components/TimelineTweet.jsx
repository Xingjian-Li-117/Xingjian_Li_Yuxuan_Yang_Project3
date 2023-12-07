import React, { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./Tweet";
import { useUser } from "../context/UserContext";

const TimelineTweet = () => {
    const [timeline, setTimeline] = useState(null);
    const { currentUser } = useUser();


    useEffect(() => {
        const fetchData = async () => {
            try {
                //if (currentUser) {
                    const timelineTweets = await axios.get(`/api/tweets/timeline/all`);
                    setTimeline(timelineTweets.data);
                //}
            } catch (error) {
                console.error("Error fetching timeline tweets", error);
            }
        };

        fetchData();
    }, [currentUser]);


    return (
        <div className="mt-6">
            {timeline && timeline.map((tweet) => {
                return (
                    <div key={tweet._id} className="p-2">
                        <Tweet tweet={tweet} setData={setTimeline} />
                    </div>
                );
            })}
        </div>
    );
}

export default TimelineTweet;
