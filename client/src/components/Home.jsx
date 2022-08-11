import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeDiv>
      <div>Hi I'm Aaron and this is under construction. If you're here for MVP please go to the Games section.</div>
      <WIPImage src="/assets/placeholder.png" />
    </HomeDiv>
  );
}

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WIPImage = styled.img`
  width: 60%;
  height: 40%;
  object-fit: cover;
`;

export default Home;