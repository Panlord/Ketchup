import React from 'react';
import GoogleCaptcha from './Captchas/GoogleCaptcha.jsx';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <AppDiv>
        <GoogleCaptcha />
      </AppDiv>
    );
  }
}

const AppDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-itmes: center;
  width: 100%;
  height: 100%;
`;

export default App;