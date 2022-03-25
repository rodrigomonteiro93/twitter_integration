import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  let navigate = useNavigate();
  const [hashtag, setHashtag] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("hashtag", hashtag);

    navigate(`/tweets`);
  }

  return (
  <>
    <h1 className="title">Informação inicial</h1>
    <form className="main-form" onSubmit={handleFormSubmit}>
      <fieldset>
        <input type="text" required onChange={(e) => setHashtag(e.target.value)} value={hashtag} name="hashtag" placeholder="Hashtag" />
      </fieldset>
      <button type="submit">Buscar pela hashtag</button>
    </form>
  </>
  )
}

export default Home;