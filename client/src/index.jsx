import React from 'react'
import  { render }  from 'react-dom';
import styled from 'styled-components';
import App from './components/App.jsx';

const SiteContainer = styled.div`
  display: flex;
  flex-directon: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

render (
  <SiteContainer>
    <App />
  </SiteContainer>,
  document.getElementById("root")
);
