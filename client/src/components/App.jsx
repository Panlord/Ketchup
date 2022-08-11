import React from 'react';
import GoogleCaptcha from './Captchas/GoogleCaptcha.jsx';
import styled from 'styled-components';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Games from './Games.jsx';
import Game from './Game.jsx';
import Scores from './Scores.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Stages
    0 - default: solve Google reCaptcha
    1 - lvl 1: text reCaptcha
    2 - lvl 2: picture reCaptcha
    3 - lvl 3: sound reCaptcha
    4 - lvl 4: other reCaptchas
    9 - post score screen
    10 - high scores
*/

class App extends React.Component {

  render () {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/games" element={<Games />} />
            <Route path="/captcha" element={<Game />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

// This may be unnecessary; remove at the end if not using
const AppDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-itmes: center;
  width: 100%;
  height: 100%;
`;

export default App;