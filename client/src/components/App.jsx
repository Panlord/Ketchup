import React from 'react';
import GoogleCaptcha from './Captchas/GoogleCaptcha.jsx';
import styled from 'styled-components';

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
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      score: 0,
      time: 0,
    }
  }

  // Function to change the stage of the game
  // Input: number representing the stage to go to
  handleStageChange (nextStage) {

  };

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