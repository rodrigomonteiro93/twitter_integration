import React, { useEffect, useState } from "react";
import "./index.css";
import { getTweet } from '../../Services/TweetService';
import socket from '../../Configs/Socket.io';
import { onNotification, closeIo } from '../../Services/IoService';

function Screen(props) {
  const [tweet, setTweet] = useState(null);
  const [tweetId, setTweetId] = useState(localStorage.getItem('lastTweetApprove') || null);

  function getData(id) {
    getTweet(id)
    .then(response => {
        if(response) {
          setTweet(response);
          localStorage.setItem('lastTweetApprove', tweetId);
          setTweetId(id);
        }
    })
    .catch(err => {
        console.error(err);
    });
  }

  useEffect(() => {
    if (tweetId)
      getData(tweetId);

    onNotification(socket, 'notifyTweetApproved', id => getData(id))
    return () => closeIo(socket);
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