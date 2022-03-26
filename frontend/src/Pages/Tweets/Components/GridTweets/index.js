import React, { useEffect, useState } from "react";
import axios from "axios";
import GridTweetsCard from "./Card";
import "./index.css";
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";

function GridTweets() {
    const [data, setData] = useState([]);
    let navigate = useNavigate();
    let intervalId = '';

    function redirectToHome(message) {
        alert(message);
        //localStorage.removeItem('userToken')
        navigate(`/`);
    }
    
    async function getData() {
        clearInterval(intervalId);
        const hashtag = localStorage.getItem('hashtag');
        const tokenStr = localStorage.getItem('userToken');

        const header = {
            headers: {
                "X-Auth-Token": tokenStr,
                "content-type": "application/json"
            }
        };
        
        axios.get(`${process.env.REACT_APP_API_URL}/tweets/${hashtag}`, header)
        .then(dataResponse => {
            setData(dataResponse.data);
            if (!data.length)
                intervalId = setInterval(getData, 10000);
        })
        .catch(function (error) {
            if (error.response) {
                redirectToHome(error.response.data.message)
            }
        });
    }

    useEffect(() => {
        if(!localStorage.getItem('hashtag'))
            redirectToHome('Informe uma hashtag')
        else if(!localStorage.getItem('userToken'))
            redirectToHome('Faça login para continuar')
        else
            getData().then();
        return () => {console.log('finiza' + intervalId); clearInterval(intervalId)};
    }, []);

    async function handleApprove(cardId) {
        const tokenStr = localStorage.getItem('userToken');
        const header = {
            headers: {
                "X-Auth-Token": tokenStr,
                "content-type": "application/json"
            }
        };
        try {
            const {status} = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/approve/${cardId}`, header);
            if (status === 200) {
                const newSocket = io(process.env.REACT_APP_API_URL);
                newSocket.emit('notifyTweetApproved', cardId);
                alert('O tweet foi aprovado e esta sendo exibido no telão');
                localStorage.setItem('lastTweetApprove', cardId);
                await getData();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleReprove(cardId) {
        const tokenStr = localStorage.getItem('userToken');
        const header = {
            headers: {
                "X-Auth-Token": tokenStr,
                "content-type": "application/json"
            }
        };
        try {
            const {status} = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/reprove/${cardId}`, header);
            if (status === 200)
                await getData();    
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
    <>
        { data.length ? (
            <div className="grid-tweets d-flex wrap justify-center">
                {data.map(item => (<GridTweetsCard key={item.id} item={item} handleApprove={handleApprove} handleReprove={handleReprove} />))}
            </div>
        ) : (
            <div className="title">
                Nenhum Tweet encontrado para #{localStorage.getItem('hashtag')}
            </div>
        )}
    </>
    )
  }

export default GridTweets;