import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  let navigate = useNavigate();
  const [hashtag, setHashtag] = useState(localStorage.getItem('hashtag'));
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("hashtag", hashtag.replace('#', ''));
    setHashtag(localStorage.getItem('hashtag'))
    navigate(`/tweets`);
  }
  
  const handleFormLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const {status, data} = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
        email: email,
        password: password,
      });
      if (status === 200) {
        if (data.auth) {
          localStorage.setItem('userToken', data.token);
          setUserToken(data.token);
          setEmail('');
          setPassword('');
          setHashtag('')
        }
      }

    } catch (error) {
        console.error(error.message);
    }
  }

  return (
    <>
        { userToken ? (
          <>
            <h1 className="title">Informar Hashtag</h1>
            <form className="main-form" onSubmit={handleFormSubmit}>
              <fieldset>
                <input type="text" required onChange={(e) => setHashtag(e.target.value)} value={hashtag} name="hashtag" placeholder="Hashtag" />
              </fieldset>
              <button type="submit">Buscar pela hashtag</button>
            </form>
          </>
        ) : (
          <>
            <h1 className="title">Login</h1>
            <form className="main-form" onSubmit={handleFormLoginSubmit}>
              <fieldset>
                <input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" />
              </fieldset>
              <fieldset>
                <input type="password" required onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Senha" />
              </fieldset>
              <button type="submit">Login</button>
            </form>
          </>
        )}
    </>
  )
}

export default Home;