import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doLogin } from '../../Services/AuthService';

function Home() {
  let navigate = useNavigate();

  const [hashtag, setHashtag] = useState(localStorage.getItem('hashtag'));
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();

    localStorage.setItem("hashtag", hashtag.replace('#', ''));
    setHashtag(localStorage.getItem('hashtag'))
    
    navigate(`/tweets`);
  }
  
  const handleFormLoginSubmit = async event => {
    event.preventDefault();

    doLogin(email, password)
    .then(response => {
        if(response) {
          localStorage.setItem('userToken', response.token);
          setUserToken(response.token);
          setEmail('');
          setPassword('');
          setHashtag('')
        }
    })
    .catch(err => {
        console.error(err);
        alert(`E-mail e/ou senha inválidos.`);
    });
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