import React from 'react';
import GoogleCaptcha from './Captchas/GoogleCaptcha.jsx';
import TextCaptcha from './Captchas/TextCaptcha.jsx';
import ImageCaptcha from './Captchas/ImageCaptcha/ImageCaptcha.jsx';
import SoundCaptcha from './Captchas/SoundCaptcha.jsx';
import styled from 'styled-components';
import Timer from './CountdownTimer.jsx';

/* Stages
  0 - default: solve Google reCaptcha
  1 - lvl 1: text reCaptcha
  2 - lvl 2: picture reCaptcha
  3 - lvl 3: sound reCaptcha
  4 - lvl 4: other reCaptchas
  9 - post score screen
  10 - high scores
*/

var deadline;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      score: 0,
      time: 0,
    }
  };

  // Function to increase the score by one
  increaseScore (value) {
    this.setState({score: this.state.score + value});
  }

  // Function to change the stage of the game
  // Input: number representing the stage to go to
  handleStageChange (nextStage) {
    // If the stage we just finished was stage 1, start the timer
    if (this.state.stage === 0) {
      deadline = Date.now() + 60000;
    }
    this.setState({stage: nextStage});
  };

  // Function to handle game over
  handleGameEnd (didLose) {
    if (didLose) {
      this.setState({stage: 9, time: 0})
    } else {
      this.setState({stage: 9, time: (Date.now() - deadline) / 1000})
    }
  }

  // Function to handle score form submission
  handleScoreSubmit (event) {
    event.preventDefault();

  }

  render () {
    let captcha;
    switch (this.state.stage) {
      case 0:
        captcha = <GoogleCaptcha changeStage={this.handleStageChange.bind(this)} />;
        break;
      case 1:
        captcha = <TextCaptcha currentScore={this.state.score} increaseScore={this.increaseScore.bind(this)} changeStage={this.handleStageChange.bind(this)} />;
        break;
      case 2:
        captcha = <ImageCaptcha currentScore={this.state.score} increaseScore={this.increaseScore.bind(this)} changeStage={this.handleStageChange.bind(this)} />;
        break;
      case 3:
        captcha = <SoundCaptcha currentScore={this.state.score} increaseScore={this.increaseScore.bind(this)} changeStage={this.handleStageChange.bind(this)} />;
        break;
      case 4:
        captcha = <div>Should be interesting</div>;
        break;
      case 9:
        captcha = <ScoreForm>
                    Input your username:
                    <UsernameInput type="text" />
                    Score:
                    <span>{this.state.score}</span>
                    Time Left:
                    <span>{this.state.time}</span>
                  </ScoreForm>
  }

  return (
    <div>
      {captcha}
      {this.state.stage > 0 && this.state.stage !== 9 && <Timer deadline={deadline} endGame={this.handleGameEnd.bind(this)} />}
    </div>
  );
  };
};

const ScoreForm = styled.form`

`;
const UsernameInput = styled.input`

`;

export default Game;