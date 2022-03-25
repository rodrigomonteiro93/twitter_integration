import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import io from 'socket.io-client';

function Screen(props) {
  const [tweet, setTweet] = useState(null);

  async function getData(id) {
    try {
      const {data: response} = await axios.get(`${process.env.REACT_APP_API_URL}/tweet/${id}`);
      console.log(response);
      setTweet(response);
    } catch (error) {
        console.error(error.message);
    }
  }
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL);

    newSocket.on('notificaTweet', function(id){
      (async function() {
        await getData(id);
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
        ) : null}
      </div>
    </>
    )
  }

export default Screen;