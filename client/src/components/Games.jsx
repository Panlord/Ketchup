import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Games = () => {

  return (
    <GameLinksDiv>
      <div>Game 1</div>
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