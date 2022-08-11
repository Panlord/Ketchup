import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <AboutDiv>
      <div>Hi this is Aaron and this is all about me: </div>
      <WIPImage src="/assets/placeholder.png" />
      <div>Yeah that's right I'm still under construction. If you're here for MVP please go to the Games section.</div>
    </AboutDiv>
  );
}

const AboutDiv = styled.div`
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

export default About;