import React from 'react';
import styled from 'styled-components';
import Timer from './CountdownTimer.jsx';
import ReactAudioPlayer from 'react-audio-player';
import GoogleCaptcha from './Captchas/GoogleCaptcha.jsx';
import TextCaptcha from './Captchas/TextCaptcha.jsx';
import ImageCaptcha from './Captchas/ImageCaptcha/ImageCaptcha.jsx';
import SoundCaptcha from './Captchas/SoundCaptcha.jsx';
import ScoreForm from './ScoreForm.jsx';
import Scores from './Scores.jsx';

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
      startTime: 0,
      music: true,
    }
  };

  // Function to increase the score by a value
  increaseScore (value) {
    this.setState({score: this.state.score + value});
    // Also increase the time by a few seconds
    deadline += 2500;
  }

  // Function to change the stage of the game
  // Input: number representing the stage to go to
  handleStageChange (nextStage) {
    // If the stage we just finished was stage 1, start the timer
    if (this.state.stage === 0) {
      deadline = Date.now() + 60000;
      this.setState({startTime: Date.now()});
    }
    this.setState({stage: nextStage});
  };

  // Function to handle game over
  handleGameEnd (didLose) {
    if (didLose) {
      this.setState({stage: 9, time: (Date.now() - this.state.startTime) / 1000})
    } else {
      this.setState({stage: 9, time: (Date.now() - this.state.startTime) / 1000})
    }
  }

  // Function to mute background music
  muteMusic () {
    this.setState({music: !this.state.music});
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
        captcha = <div>This is a placeholder. If you see this, contact me.</div>;
        break;
      case 9:
        captcha = <ScoreForm score={this.state.score} time={this.state.time} changeStage={this.handleStageChange.bind(this)} />
        break;
      case 10:
        captcha = <Scores />;
        break;
  }

  return (
    <div>
      {captcha}
      {this.state.stage > 0 && this.state.stage < 9 && <Timer deadline={deadline} endGame={this.handleGameEnd.bind(this)} />}
      {this.state.stage > 0 && <ReactAudioPlayer src="/assets/ColressBattle_Zame.mp3" autoPlay={true} volume={0.1} loop={true} muted={!this.state.music} />}
      {this.state.stage > 0 && <MuteMusicButton type="button" onClick={this.muteMusic.bind(this)}>Mute Music</MuteMusicButton>}
      {this.state.stage > 0 && <ScoreDisplay>Score: {this.state.score}</ScoreDisplay>}
    </div>
  );
  };
};

const MuteMusicButton = styled.button`
  position: absolute;
  top: 10%;
  right: 0%;
`;
const ScoreDisplay = styled.span`
  position: absolute;
  bottom: 0%;
  left: 0%;
  font-size: 30px;
`;

export default Game;