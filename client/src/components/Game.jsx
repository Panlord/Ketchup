import React from 'react';
import GoogleCaptcha from './Captchas/GoogleCaptcha.jsx';
import TextCaptcha from './Captchas/TextCaptcha.jsx';
import ImageCaptcha from './Captchas/ImageCaptcha/ImageCaptcha.jsx';
import SoundCaptcha from './Captchas/SoundCaptcha.jsx';
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 2,
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
    this.setState({stage: nextStage});
  };

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
    }

    return (
      <div>
        {captcha}
      </div>
    );
  };
};

export default Game;