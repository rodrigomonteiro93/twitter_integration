import React, { useEffect, useState } from "react";
import axios from "axios";
import GridTweetsCard from "./Card";
import "./index.css";
import io from 'socket.io-client';

function GridTweets(props) {
    const [data, setData] = useState([]);
    
    async function getData() {
        console.log('testa'); 
        const hashtag = localStorage.getItem('hashtag');
        try {
            const {data: response} = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/${hashtag}`);
            setData(response);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        (async function() {
            await getData();
            if (!data.length) {
                console.log('aaa'); 
                setInterval(getData, 10000);
            }
        })();
        
    }, []);

    async function handleApprove(cardId) {
        try {
            const {status} = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/approve/${cardId}`);
            if (status === 200) {
                const newSocket = io(process.env.REACT_APP_API_URL);
                newSocket.emit('notificaTweet', cardId);
                await getData();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleReprove(cardId) {
        try {
            const {status} = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/reprove/${cardId}`);
            if (status === 200)
                await getData();    
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
    <>
        <h1 className="title">Tweets</h1>
        <div className="grid-technology d-flex wrap justify-center">
            {data.map(item => (<GridTweetsCard key={item.id} item={item} handleApprove={handleApprove} handleReprove={handleReprove} />))}
        </div>
    </>
    )
  }

export default GridTweets;