import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Games = () => {

  return (
    <GameLinksDiv>
      <a href="https://github.com/Panlord/ESCapeFromKemper-WebGLBuild"><MVPImage src="https://panlord.github.io/game-power-down/EscapeFromKemper/images/MenuScreen.png" alt="Old Game"/></a>
      <Link to="/captcha"><MVPImage src="/assets/mvpImg.png" alt="MVP"/></Link>
    </GameLinksDiv>
  );
}

const GameLinksDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80%;
`;
const MVPImage = styled.img`
  width: 430px;
  height: 265px;
  object-fit: cover;
`;

export default Games;