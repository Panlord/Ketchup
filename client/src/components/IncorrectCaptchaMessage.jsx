import React from 'react';
import styled from 'styled-components';

const IncorrectMessage = (props) => {
  return (
    <IncorrectMessageContainer>
      Incorrect CAPTCHA.
    </IncorrectMessageContainer>
  );
};

const IncorrectMessageContainer = styled.div`
  position: absolute;
  top: 20vh;
  transform: translateX(35%);
  background-color: #fe8972;
  color: #a11d02;
  border: solid 2px;
  border-color: #a11d02;
  padding: 20px 40px;

`;

export default IncorrectMessage;