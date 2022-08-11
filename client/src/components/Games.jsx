import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Games = () => {

  return (
    <GameLinksDiv>
      <div>Game 1</div>
      <Link to="/captcha"><div>MVP</div></Link>
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

export default Games;