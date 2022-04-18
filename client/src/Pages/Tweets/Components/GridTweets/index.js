import React, { useEffect, useState } from "react";
import GridTweetsCard from "./Card";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { getTweets, approveTweet, reproveTweet } from '../../../../Services/TweetService';
import socket from '../../../../Configs/Socket.io';
import { emmitNotification } from '../../../../Services/IoService';

function GridTweets() {
    const [data, setData] = useState([]);
    const [hashtag, setHashtag] = useState(localStorage.getItem('hashtag'));

    let navigate = useNavigate();
    let intervalId = '';

    function redirectToHome(message) {
        alert(message);
        localStorage.removeItem('userToken')
        navigate(`/`);
    }
    
    async function getData() {
        clearInterval(intervalId);
        
        getTweets(hashtag, localStorage.getItem('userToken'))
        .then(response => {
            if(response)
                setData(response);
            if (!response.length)
                intervalId = setInterval(getData, 10000);
        })
        .catch(function (error) {
            if (error.response) {
                redirectToHome(error.response.data.message)
            }
        });
    }

    useEffect(() => {
        if (!localStorage.getItem('userToken'))
            redirectToHome('Faça login para continuar')
        else if (!localStorage.getItem('hashtag'))
            redirectToHome('Informe uma hashtag')
        else
            getData().then();
        return () => clearInterval(intervalId);
    }, [ hashtag ]);

    async function handleApprove(cardId) {
        approveTweet(cardId, localStorage.getItem('userToken'))
        .then(response => {
            if (response) {
                emmitNotification(socket, 'notifyTweetApproved', cardId);
                alert('O tweet foi aprovado e esta sendo exibido no telão');
                localStorage.setItem('lastTweetApprove', cardId);
                getData();
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    async function handleReprove(cardId) {
        reproveTweet(cardId, localStorage.getItem('userToken'))
        .then(response => {
            if (response) {
                alert('O tweet foi reprovado.');
                getData();
            }
        })
        .catch(err => {
            console.error(err);
        });
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