import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import io from 'socket.io-client';

function Screen(props) {
  const [tweet, setTweet] = useState(null);
  const [tweetId, setTweetId] = useState(localStorage.getItem('lastTweetApprove') || null);
  const newSocket = io(process.env.REACT_APP_API_URL);

  async function getData(id) {
    const tokenStr = localStorage.getItem('userToken');
    const header = {
        headers: {
            "X-Auth-Token": tokenStr,
            "content-type": "application/json"
        }
    };
    try {
      const {data: response} = await axios.get(`${process.env.REACT_APP_API_URL}/tweet/${id}`, header);

      setTweet(response);
    } catch (error) {
        console.error(error.message);
    }
  }
  useEffect(() => {
    if (tweetId) {
      (async function() {
        await getData(tweetId);
        localStorage.setItem('lastTweetApprove', tweetId);
      })();
    }

    newSocket.on('notifyTweetApproved', function(id) {
      (async function() {
        await getData(id);
        localStorage.setItem('lastTweetApprove', id);
      })();
    });

    return () => newSocket.close();
  }, [setTweet]);
    return (
    <>
      <div className="page-screen">
        { tweet ? (
          <div className="tweet-container">
            {tweet.text}
          </div>
        ) : (
          <div className="tweet-container">
            Aguardando aprovação de um novo Tweet
          </div>
          )}
      </div>
    </>
    )
  }

export default Screen;