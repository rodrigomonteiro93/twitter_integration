import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('userToken');
let header = {
    headers: {
        "X-Auth-Token": token,
        "content-type": "application/json"
    }
};

export async function getTweet(id, password) {
  const response = await axios.get(`${API_URL}/tweet/${id}`);
  return response.data;
}

export async function getTweets(hashtag, newToken) {
  header = changeToken(newToken)

  const response = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/${hashtag}`, header);
  return response.data;
}

export async function approveTweet(id, newToken) {
  header = changeToken(newToken)

  const response = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/approve/${id}`, header);
  return response.data;
}

export async function reproveTweet(id, newToken) {
  header = changeToken(newToken)

  const response = await axios.get(`${process.env.REACT_APP_API_URL}/tweets/reprove/${id}`, header);
  return response.data;
}

const changeToken = token => {
  if (token)
    header.headers['X-Auth-Token'] = token;
  
  return header
}